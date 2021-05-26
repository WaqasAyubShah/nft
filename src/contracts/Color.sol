pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract Color is ERC721Full {
  string[] public colors;                 //define an array which will contain all the token
  mapping(string => bool) _colorExists;   //to avoid duplication
  address public creator;                 //To save the creator of the content
  string[] public sharesValue;            //To find what the creator offering in returns.
  uint256 public initialPrice;            //this will be define by creator that for how much he is offering the nft

  address public owner;                   //who own the nft at the movement.
  bool private iamselling = false;        //Set the bool false in start.
  address public buyer;                   //to find who is buying the nft and what will be the terms



  constructor() ERC721Full("Color", "COLOR") public {
  }

  // E.G. color = "#FFFFFF"
  // Our Code format will be 22010-369ABC7-01
  function mint(string memory _color) public {              //call this function with a code of a song
    require(!_colorExists[_color]);                         //check the code don't exists
    uint _id = colors.push(_color);                         //assign the color to an integer so that we can mint it
    _mint(msg.sender, _id);                                 //_mint is global function required from ERC721Full
     creator = msg.sender;                                  //store the address of the person who mint it
     owner = creator;
    _colorExists[_color] = true;                            //set the particular code to true so that it is not use again
  }
/*   function store(string memory numSV) public {
      sharesValue.push(numSV);
  }
  function retrieve() public view returns (uint256){
      return sharesValue[0];                     //we will retrieve the value by calling this..
  }
  function ownerAddress() public view returns(address){
      return creator;
  }
  function sellNft() public {                            //it is for sale
      require(msg.sender == owner);
      iamselling = true;
  }
 function buyNft() public payable {                              //this will change the ownership of token
      require(iamselling == true);
      require(msg.value > initialPrice);
      //uint256 token id  =
      buyer = msg.sender;
      //_transferFrom( owner , buyer , uint256 tokenId);
      owner = buyer;
      iamselling = false;
  }*/

  function shareCal() public{                               //this will split the nft amount

  }
  function royaltyCal() public{                             //this will split the royalty

  }

}
