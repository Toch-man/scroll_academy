// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

/**
 * @title ScrollAcademy
 * @dev Gamified learning platform for Scroll L2 with soulbound NFT badges
 */
contract ScrollAcademy is ERC721, Ownable {
    using Strings for uint256;

    // Module structure
    struct Module {
        string title;
        string description;
        bytes32 quizAnswerHash; // Hash of correct answers
        bool active;
    }

    // User progress tracking
    struct UserProgress {
        uint256 completedModules;
        mapping(uint256 => bool) moduleCompleted;
        bool hasGraduated;
        uint256 badgeTokenId;
    }

    // State variables
    uint256 public totalModules;
    uint256 public nextTokenId = 1;
    string public baseTokenURI;
    
    mapping(uint256 => Module) public modules;
    mapping(address => UserProgress) public userProgress;
    mapping(uint256 => address) public badgeOwner; // tokenId => owner
    
    // Events
    event ModuleAdded(uint256 indexed moduleId, string title);
    event ModuleCompleted(address indexed user, uint256 indexed moduleId);
    event Graduated(address indexed user, uint256 indexed tokenId);
    
    constructor(string memory _baseTokenURI) ERC721("Scroll Academy Grandmaster", "SAGM") {
        baseTokenURI = _baseTokenURI;
    }

    /**
     * @dev Add a new learning module (only owner)
     * @param title Module title
     * @param description Module description  
     * @param quizAnswerHash Hash of quiz answers (keccak256 of sorted answers)
     */
    function addModule(
        string memory title,
        string memory description,
        bytes32 quizAnswerHash
    ) external onlyOwner {
        totalModules++;
        modules[totalModules] = Module({
            title: title,
            description: description,
            quizAnswerHash: quizAnswerHash,
            active: true
        });
        
        emit ModuleAdded(totalModules, title);
    }

    /**
     * @dev Update module quiz answer hash
     */
    function updateModuleAnswers(uint256 moduleId, bytes32 newAnswerHash) external onlyOwner {
        require(moduleId > 0 && moduleId <= totalModules, "Invalid module");
        modules[moduleId].quizAnswerHash = newAnswerHash;
    }

    /**
     * @dev Toggle module active status
     */
    function toggleModule(uint256 moduleId) external onlyOwner {
        require(moduleId > 0 && moduleId <= totalModules, "Invalid module");
        modules[moduleId].active = !modules[moduleId].active;
    }

    /**
     * @dev Submit quiz answers for a module
     * @param moduleId Module to complete
     * @param answers Array of answer indices (0-based)
     */
    function submitQuiz(uint256 moduleId, uint256[] memory answers) external {
        require(moduleId > 0 && moduleId <= totalModules, "Invalid module");
        require(modules[moduleId].active, "Module not active");
        require(!userProgress[msg.sender].moduleCompleted[moduleId], "Already completed");
        
        // Check if previous module completed (except for first module)
        if (moduleId > 1) {
            require(
                userProgress[msg.sender].moduleCompleted[moduleId - 1],
                "Complete previous module first"
            );
        }

        // Verify answers
        bytes32 submittedHash = keccak256(abi.encodePacked(answers));
        require(submittedHash == modules[moduleId].quizAnswerHash, "Incorrect answers");

        // Mark module as completed
        userProgress[msg.sender].moduleCompleted[moduleId] = true;
        userProgress[msg.sender].completedModules++;

        emit ModuleCompleted(msg.sender, moduleId);

        // If all modules completed, mint graduation badge
        if (userProgress[msg.sender].completedModules == totalModules) {
            _graduate(msg.sender);
        }
    }

    /**
     * @dev Internal function to mint graduation NFT badge
     */
    function _graduate(address user) internal {
        require(!userProgress[user].hasGraduated, "Already graduated");
        
        uint256 tokenId = nextTokenId++;
        _safeMint(user, tokenId);
        
        userProgress[user].hasGraduated = true;
        userProgress[user].badgeTokenId = tokenId;
        badgeOwner[tokenId] = user;
        
        emit Graduated(user, tokenId);
    }

    /**
     * @dev Override _beforeTokenTransfer to make badges soulbound (non-transferable)
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal virtual override {
        // Allow minting (from == address(0)) but block transfers
        require(from == address(0), "Soulbound: Transfer not allowed");
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    /**
     * @dev Get user's completion status
     */
    function getUserProgress(address user) external view returns (
        uint256 completed,
        uint256 total,
        bool graduated,
        uint256 badgeId
    ) {
        return (
            userProgress[user].completedModules,
            totalModules,
            userProgress[user].hasGraduated,
            userProgress[user].badgeTokenId
        );
    }

    /**
     * @dev Check if user completed specific module
     */
    function hasCompletedModule(address user, uint256 moduleId) external view returns (bool) {
        return userProgress[user].moduleCompleted[moduleId];
    }

    /**
     * @dev Get module details
     */
    function getModule(uint256 moduleId) external view returns (
        string memory title,
        string memory description,
        bool active
    ) {
        require(moduleId > 0 && moduleId <= totalModules, "Invalid module");
        Module memory m = modules[moduleId];
        return (m.title, m.description, m.active);
    }

    /**
     * @dev Update base URI for token metadata
     */
    function setBaseTokenURI(string memory newBaseURI) external onlyOwner {
        baseTokenURI = newBaseURI;
    }

    /**
     * @dev Override tokenURI to return dynamic metadata
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return string(abi.encodePacked(baseTokenURI, tokenId.toString(), ".json"));
    }
}