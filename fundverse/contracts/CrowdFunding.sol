// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract crowdFunding {
    struct Campaign{
        address owner;
        string title;
        string desc;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;    //Contains the amount  collected
        string imageurl;    //Contains the image url
        address[] donators; //Array to keep track of donations 
        uint256[] donation; //Array to keep track of the amount of donation done
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    //Create Campaign Function
    function createCampaign(address _owner, string memory _title, string memory _desc, uint256 _target, uint256 _deadline, string memory _imageurl) public returns(uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(campaign.deadline< block.timestamp, "Kindly give a deadline which has not already passed.");    //Checks if the campaign deadline has not passed already

        //Adding necessary info to the campaigns
        campaign.owner = _owner;
        campaign.title = _title;
        campaign.desc = _desc;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.imageurl = _imageurl; 

        numberOfCampaigns++;    //Increasing the number of campaigns after we have added one

        return numberOfCampaigns - 1;   //Will return the index of the most recently created Campaign
    }

    //Donating to the Campaign Function
    function donateToCampaign(uint256 _idOfCampaign) public payable {
        uint256 amt = msg.value;

        Campaign storage campaign = campaigns[_idOfCampaign];

        campaign.donators.push(msg.sender); //Pushing the address of the person who has donated to the array
        campaign.donation.push(amt);    //Pushing the amount donated to the array

        (bool transactionStatus,) = payable(campaign.owner).call{value: amt}("");   //The comma is there as payable returns two things so we are letting solidity know that something else might come too

        if(transactionStatus){
            campaign.amountCollected += amt;
        }
    }

    //Function to Get all the donations with the address of the donator
    function getDonators(uint256 _idOfCampaign) view public returns(address[] memory, uint256[] memory) {
        return(campaigns[_idOfCampaign].donators, campaigns[_idOfCampaign].donation);
    }

    //Function to Get all the campaigns listed
    function getAllCampaigns() public view returns(Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns); //Creates an empty array of that many structs as the number of actual campaigns
        for(uint i = 0; i < numberOfCampaigns; i++){
            Campaign storage campaignItem = campaigns[i];

            allCampaigns[i] = campaignItem;
        }

        return allCampaigns;
    }

}