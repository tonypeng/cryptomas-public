# Cryptomas
Create holiday-themed cryptocurrency gift cards!
https://merrycryptomas.com

<p align="center">
  <img src="https://merrycryptomas.com/screenshot.png" />
</p>

### Why is the code only partially open-sourced?
https://merrycryptomas.com/about "Is it open-source?"

### Project structure
* src
  * lib
    * GiftCard
      * handles rendering the wallets for a gift card
    * asset
      * library code for handling assets--from *generating wallets* to asset descriptions to to generating the Algorand Wallet app passphrase QR string format
    * create
      * UI components for creating a wallet and generating a link to a card
    * view_card
      * UI component for viewing a share-link to a card
