import { AssetConfigStruct } from '../../build/types/Comet';
import { BigNumberish, Contract, PopulatedTransaction } from 'ethers';

export { cloneGov, deployNetworkComet as deployComet, sameAddress } from './Network';
export { getConfiguration, getConfigurationStruct } from './NetworkConfiguration';
export { exp, getBlock, wait } from '../../test/helpers';
export { debug } from '../../plugins/deployment_manager/Utils';

export interface ProtocolConfiguration {
  name?: string;
  symbol?: string;
  governor?: string;
  pauseGuardian?: string;
  baseToken?: string;
  baseTokenPriceFeed?: string;
  extensionDelegate?: string;
  supplyKink?: BigNumberish;
  supplyPerYearInterestRateBase?: BigNumberish;
  supplyPerYearInterestRateSlopeLow?: BigNumberish;
  supplyPerYearInterestRateSlopeHigh?: BigNumberish;
  borrowKink?: BigNumberish;
  borrowPerYearInterestRateBase?: BigNumberish;
  borrowPerYearInterestRateSlopeLow?: BigNumberish;
  borrowPerYearInterestRateSlopeHigh?: BigNumberish;
  storeFrontPriceFactor?: BigNumberish;
  trackingIndexScale?: BigNumberish;
  baseTrackingSupplySpeed?: BigNumberish;
  baseTrackingBorrowSpeed?: BigNumberish;
  baseMinForRewards?: BigNumberish;
  baseBorrowMin?: BigNumberish;
  targetReserves?: BigNumberish;
  assetConfigs?: AssetConfigStruct[];
  rewardTokenAddress?: string;
}

// If `all` is specified, it takes precedence.
// Other options are independent of one another.
export interface DeploySpec {
  all?: boolean; // Re-deploy everything (including proxies and proxy admin)
  cometMain?: boolean; // Re-deploy the main interface (config impl + comet factory + comet impl)
  cometExt?: boolean; // Re-deploy the ext interface (comet ext)
  rewards?: boolean; // Re-deploy the rewards contract
}

export interface ContractAction {
  contract: Contract;
  value?: BigNumberish;
  signature: string;
  args: any[];
}

export interface TargetAction {
  target: string;
  value?: BigNumberish;
  signature: string;
  calldata: string;
}

export type ProposalAction = ContractAction | TargetAction;
export type Proposal = [
  string[], // targets
  BigNumberish[], // values
  string[], // signatures
  string[], // calldatas
  string // description
];

// Note: this list could change over time
// Ideally these wouldn't be hardcoded, but other solutions are much more complex, and slower
export const COMP_WHALES = {
  mainnet: [
    '0x9aa835bc7b8ce13b9b0c9764a52fbf71ac62ccf1',
    '0x683a4f9915d6216f73d6df50151725036bd26c02',
    '0x8169522c2C57883E8EF80C498aAB7820dA539806',
    '0x8d07D225a769b7Af3A923481E1FdF49180e6A265',
    '0x7d1a02C0ebcF06E1A36231A54951E061673ab27f',
    '0x54A37d93E57c5DA659F508069Cf65A381b61E189'
  ],

  testnet: ['0xbbfe34e868343e6f4f5e8b5308de980d7bd88c46']
};

export const WHALES = {
  mainnet: [
    '0xf977814e90da44bfa03b6295a0616a897441acec',
    '0x0548f59fee79f8832c299e01dca5c76f034f558e',
    '0x218b95be3ed99141b0144dba6ce88807c4ad7c09',
    '0xf04a5cc80b1e94c69b48f5ee68a08cd2f09a7c3e',
    '0x2775b1c75658be0f640272ccb8c72ac986009e38',
    '0x1a9c8182c09f50c8318d769245bea52c32be35bc',
    '0x3c22ec75ea5D745c78fc84762F7F1E6D82a2c5BF',
    '0x88a1493366D48225fc3cEFbdae9eBb23E323Ade3', // USDe whale
    '0x43594da5d6A03b2137a04DF5685805C676dEf7cB', // rsETH whale
    '0x3d9819210a31b4961b30ef54be2aed79b9c9cd3b'
  ],
  polygon: [
    '0x2093b4281990a568c9d588b8bce3bfd7a1557ebd', // WETH whale
    '0xd814b26554204245a30f8a42c289af582421bf04', // WBTC whale
    '0x167384319b41f7094e62f7506409eb38079abff8'  // WMATIC whale
  ],
  arbitrum: [
    '0x8eb270e296023e9d92081fdf967ddd7878724424', // rETH whale
    '0x78e88887d80451cb08fdc4b9046c9d01fb8d048d', // rETH whale
    '0xc0cf4b266be5b3229c49590b59e67a09c15b22f4', // rETH whale
    '0x84446698694b348eaece187b55df06ab4ce72b35', // rETH whale
    '0x42c248d137512907048021b30d9da17f48b5b7b2', // wstETH whale
    '0xc3e5607cd4ca0d5fe51e09b60ed97a0ae6f874dd', // WETH whale
    '0xf89d7b9c864f589bbf53a82105107622b35eaa40', // USDC whale
    '0x7b7b957c284c2c227c980d6e2f804311947b84d0', // WBTC whale
    '0x1c6b5795be43ddff8812b3e577ac752764635bc5', // COMP whale
    '0xdead767ba9f8072c986a4619c27ae46bcc226c13', // COMP whale
    '0xde5167c19a5286889752cb0f31a1c7f28a99fefb', // COMP whale
    '0xdfa19e743421c394d904f5a113121c2227d2364b', // COMP whale
    '0xee3273f6d29ddfff08ffd9d513cff314734f01a2', // COMP whale
    '0x9e786a8fc88ee74b758b125071d45853356024c3', // COMP whale
    '0xd93f76944e870900779c09ddf1c46275f9d8bf9b', // COMP whale
    '0xe68ee8a12c611fd043fb05d65e1548dc1383f2b9'  // native USDC whale
  ],
  base: [
    '0x6D3c5a4a7aC4B1428368310E4EC3bB1350d01455', // USDbC whale
    '0x07CFA5Df24fB17486AF0CBf6C910F24253a674D3', // cbETH whale TODO: need to update this whale, not enough
    '0xBBBBBbbBBb9cC5e90e3b3Af64bdAF62C37EEFFCb', // cbETH whale
    '0x3bf93770f2d4a794c3d9EBEfBAeBAE2a8f09A5E5', // cbETH whale
    '0xcf3D55c10DB69f28fD1A75Bd73f3D8A2d9c595ad', // cbETH whale
    '0xb125E6687d4313864e53df431d5425969c15Eb2F', // cbETH whale
  ],
  scroll: [
    '0xaaaaAAAACB71BF2C8CaE522EA5fa455571A74106'  // USDC whale
  ],
  'arbitrum-goerli': [
    '0x4984cbfa5b199e5920995883d345bbe14b005db7', // USDC whale
    '0xbbfe34e868343e6f4f5e8b5308de980d7bd88c46', // LINK whale
    '0x8DA65F8E3Aa22A498211fc4204C498ae9050DAE4', // COMP whale
    '0x6ed0c4addc308bb800096b8daa41de5ae219cd36'  // native USDC whale
  ],
  'base-goerli': [
    '0x21856935e5689490c72865f34CC665D0FF25664b'  // USDC whale
  ],
  'linea-goerli': [
    '0xC858966280Da3Fa0348E51D2c3B892EcC889fC98', // USDC whale
    '0x44411c605eb7e009cad03f3847cfbbfcf8895130'  // COMP whale
  ],
  optimism: [
    '0x2A82Ae142b2e62Cb7D10b55E323ACB1Cab663a26', // OP whale
    '0x8af3827a41c26c7f32c81e93bb66e837e0210d5c', // USDC whale
    '0xc45A479877e1e9Dfe9FcD4056c699575a1045dAA', // wstETH whale
  ]
};

export async function calldata(req: Promise<PopulatedTransaction>): Promise<string> {
  // Splice out the first 4 bytes (function selector) of the tx data
  return '0x' + (await req).data.slice(2 + 8);
}

export async function proposal(actions: ProposalAction[], description: string): Promise<Proposal> {
  const targets = [],
    values = [],
    signatures = [],
    calldatas = [];
  for (const action of actions) {
    if (action['contract']) {
      const { contract, value, signature, args } = action as ContractAction;
      targets.push(contract.address);
      values.push(value ?? 0);
      signatures.push(signature);
      calldatas.push(await calldata(contract.populateTransaction[signature](...args)));
    } else {
      const { target, value, signature, calldata } = action as TargetAction;
      targets.push(target);
      values.push(value ?? 0);
      signatures.push(signature);
      calldatas.push(calldata);
    }
  }
  return [targets, values, signatures, calldatas, description];
}