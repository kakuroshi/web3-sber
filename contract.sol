// SPDX-License-Identifier: MIT
pragma solidity >0.7.0;

contract sber{
    struct User {
        string name;
        uint role;
    }

    struct Transfer {
        address recipient;
        address sender;
        uint amount;
        uint category;
        bool status_accept;
        bool end_transfer;
        bytes32 code_word;
    }

    struct upAdmin {
        address applicant;
        address[] golosa;
        bool status;
    }

    struct Category {
        uint id;
        string name;
    }

    mapping (address => User) users;

    address[] public allUsers;
    Transfer[] public transfers;
    address[] public admins;
    upAdmin[] public applications;
    Category[] public categories;

    constructor () {
        users[0x264829bb0854bd06FBaE88A0563dF72b8bb5658D] = User("Belyaev Semyon Sergeevich", 1);
        admins.push(0x264829bb0854bd06FBaE88A0563dF72b8bb5658D);
        allUsers.push(0x264829bb0854bd06FBaE88A0563dF72b8bb5658D);

        users[0x33C21b414f9bF8676A607D82C1D91c881AB8cC64] = User ("Shuklin Danila Sergeevich", 0);
        allUsers.push(0x33C21b414f9bF8676A607D82C1D91c881AB8cC64);

        users[0x30b1051402D7ca0bDDeBBC37143724d1bBdd3101] = User("Abgaryan Smbad", 1);
        admins.push(0x30b1051402D7ca0bDDeBBC37143724d1bBdd3101);
        allUsers.push(0x30b1051402D7ca0bDDeBBC37143724d1bBdd3101);

        categories.push(Category(1, "Personal transfer"));
    }

    function addCategory (string memory _name) public  {
        require(users[msg.sender].role == 1);

        for (uint i; i < categories.length; i++) {
            if (keccak256(abi.encodePacked(categories[i].name)) == keccak256(abi.encodePacked(_name))) {
                revert("Already exists");
            }
        }

        categories.push(Category(categories.length, _name));
    }

    function viewCategories () public view returns (Category[] memory) {
        return categories;
    }
 
    function send_money(address _recipient, bytes32 _code_word, uint _category) public payable{
        require(msg.value > 0, "Insufficient funds");
        require(msg.sender != _recipient, "This translation is not meant for you.");

        transfers.push(Transfer(_recipient, msg.sender, msg.value, _category, false, false, _code_word));
    }

    function accept_the_transfer(bytes32 _code_word, uint _id) public payable{
        require(transfers[_id].end_transfer == false, "The transaction has already been completed");
        require(msg.sender == transfers[_id].recipient, "This translation is not for you");

        if (transfers[_id].code_word == _code_word) {
            transfers[_id].status_accept = true;
            payable(msg.sender).transfer(transfers[_id].amount);
            transfers[_id].end_transfer = true;
        } else {
            payable(transfers[_id].sender).transfer(transfers[_id].amount);
            transfers[_id].end_transfer = true;
        }
    }

    function refuse_transfer_sender ( uint _id) public {
        require(msg.sender == transfers[_id].sender, "This translation is not for you");
        require(transfers[_id].end_transfer == false, "The transaction has already been completed");

        payable(transfers[_id].sender).transfer(transfers[_id].amount);
        transfers[_id].end_transfer = true;
    }

    function get_transfers() public view returns(Transfer[] memory) {
        return transfers;
    }

    function addAdmin (address _user) public {
        require(users[msg.sender].role == 1);
        require(users[_user].role != 1);

        address[] memory help;

        for (uint i; i < applications.length; i++) {
            if (applications[i].applicant == _user && applications[i].status != true) {
                require(applications[i].applicant == _user && applications[i].status == true, "Already exists");
            }
        }

        applications.push(upAdmin(_user, help, false));
    }

    function golosToUp(uint _id) public {
        require(users[msg.sender].role == 1);
        require(applications[_id].status != true, "Already an administrator");

        for (uint i = 0; i < applications[_id].golosa.length; i++) {
            require(msg.sender != applications[_id].golosa[i], "Already voted");
        }

        applications[_id].golosa.push(msg.sender);

        if (applications[_id].golosa.length == admins.length) {
            users[applications[_id].applicant].role = 1;
            admins.push(applications[_id].applicant);
            applications[_id].status = true;
        }
    }

    function viewAdmins () public view returns (address[] memory) {
        return admins;
    }

    function viewApplications () public view returns (upAdmin[] memory) {
        return applications;
    }

    function viewUsers () public view returns (address[] memory) {
        return allUsers;
    }

    function viewUserInf (address _user) public view returns (User memory) {
        return users[_user];
    }
}