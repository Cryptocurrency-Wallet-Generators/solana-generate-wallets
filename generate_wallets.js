const { Keypair } = require('@solana/web3.js');
const bip39 = require('bip39');
const fs = require('fs');

async function generateWallets(count) {
    const wallets = [];
    for (let i = 0; i < count; i++) {
        // Generate a 24-word mnemonic
        const mnemonic = bip39.generateMnemonic(256);

        // Derive a seed from the mnemonic
        const seed = await bip39.mnemonicToSeed(mnemonic);

        // Generate a Keypair from the seed
        const keypair = Keypair.fromSeed(seed.slice(0, 32));

        // Save wallet info
        wallets.push({
            address: keypair.publicKey.toBase58(),
            privateKey: Buffer.from(keypair.secretKey).toString('hex'),
            mnemonic
        });
    }

    return wallets;
}

async function main() {
    const walletCount = 50; // Number of wallets to generate
    const wallets = await generateWallets(walletCount);

    // Save wallets to a file
    const outputFileName = 'solana_wallets.json';
    fs.writeFileSync(outputFileName, JSON.stringify(wallets, null, 2));

    console.log(`Generated ${walletCount} wallets and saved to ${outputFileName}`);
}

main().catch(console.error);
