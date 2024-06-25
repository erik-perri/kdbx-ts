import type AutoTypeAssociation from './AutoTypeAssociation';

type AutoType = {
  enabled?: boolean;
  /**
   * 0: No obfuscation.
   * 1: Two-channel auto-type obfuscation.
   */
  dataTransferObfuscation?: number;
  defaultSequence?: string;
  associations?: AutoTypeAssociation[];
};

export default AutoType;
