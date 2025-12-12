import { expect } from "chai";
import { ethers } from "hardhat";
import { ScrollAcademy } from "../typechain-types";

describe("ScrollAcademy", function () {
  let academy: ScrollAcademy;

  before(async () => {
    const factory = await ethers.getContractFactory("ScrollAcademy");
    academy = (await factory.deploy("https://example.com/metadata/")) as ScrollAcademy;
    await academy.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the baseTokenURI", async () => {
      const uri = await academy.baseTokenURI();
      expect(uri).to.equal("https://example.com/metadata/");
    });
  });

  describe("Modules", function () {
    it("Should allow owner to add a module", async () => {
      await academy.addModule("Intro to Scroll", "Basic concepts", ethers.keccak256(ethers.toUtf8Bytes("1,2,3")));

      const module = await academy.getModule(1);

      expect(module[0]).to.equal("Intro to Scroll"); // title
    });
  });
});
