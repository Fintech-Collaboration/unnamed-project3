import ether from "./helpers/ethers";

const Web3 = require("web3");
const BN = web3.utils.BN;
const VixcoinToken = artifacts.require("VixcoinToken");
const VixcoinTokenCrowdsale = artifacts.require("VixcoinTokenCrowdsale");

var chai = require("chai");
chai.use(require('chai-as-promised'));
chai.use(require("chai-bn")(BN));
chai.should();


contract("VixcoinTokenCrowdsale", function([_, wallet, investor1, investor2]) {
    
    beforeEach(async function () {
        // Token config
        this.name = "Vixcoin";
        this.symbol = "VXCN";
        this.decimals = 18;

        // Deploy Token
        this.token = await VixcoinToken.new(
            this.name,
            this.symbol,
            this.decimals
        );

        // Crowdsale config
        this.rate = new BN(500);
        this.wallet = wallet;

        // Deploy Token
        this.crowdsale = await VixcoinTokenCrowdsale.new(
            this.rate,
            this.wallet,
            this.token.address
        );

        // Transfer token ownership to crowdsale
        // await this.token.transferOwnership(this.crowdsale.address)
    });

    describe("crowdsale attributes", function () {
        it("tracks the wallet", async function () {
            const wallet = await this.crowdsale.wallet();
            wallet.should.equal(this.wallet);
        });

        it("tracks the rate", async function () {
            const rate = await this.crowdsale.rate();
            rate.should.be.bignumber.equal(this.rate);
        });

        it("tracks the token", async function () {
            const token = await this.crowdsale.token();
            token.should.equal(this.token.address);
        });
    });

    
    const calcWeiRaised = async (crowdsale) => {
        const weiRaised = await crowdsale.weiRaised();
        console.log(weiRaised);
    }

    calcWeiRaised(this.crowdsale);

    // describe("accepting payments", function() {
    //     it("should accept payments", async function() {
    //         const tokenAmount = ether("1");
    //         const beneficiary = "0x9dBEC92545Fdf0f07aCC9773DA8Ff9B53f8393C5";

    //         // await this.crowdsale.buyTokens(investor1, { value: value, from: purchaser }).should.be.fulfilled;
    //     });
    // });

})