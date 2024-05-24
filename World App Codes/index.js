const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'yourusername',
  host: 'localhost',
  database: 'worldcoin',
  password: 'yourpassword',
  port: 5432,
});

app.use(bodyParser.json());

app.post('/user', async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
   
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = '0xYourContractAddress';
const abi = [
  // ABI of the Worldcoin contract
];

const contract = new ethers.Contract(contractAddress, abi, signer);

const getBalance = async (address) => {
  const balance = await contract.balanceOf(address);
  return ethers.utils.formatEther(balance);
};

const mintTokens = async (to, amount) => {
  const tx = await contract.mint(to, ethers.utils.parseEther(amount));
  await tx.wait();
  console.log('Tokens minted successfully');
};
