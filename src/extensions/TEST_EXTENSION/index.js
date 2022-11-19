//THIS IS A TEST EXTENSION, AND AT NO POINT SHOULD IT BE ADDED TO THE EXTENSION MENU OR THE IMPORT LIST

class TEST_EXTENSION {
  getInfo() {
    return {
      id: 'TEST_EXTENSION', // change this if you make an actual extension!
      name: 'TEST_EXTENSION',
      blocks: [
        {
          opcode: 'logBranch',
          blockType: Scratch.BlockType.COMMAND,
          branchCount: 1,
          text: 'Log value of first block in branch %1',
        }
      ]
    };
  }
  logBranch(args) {
    if (util.thread.peekStack() && util.target.blocks.getBlock(util.thread.peekStack()) && util.target.blocks.getBlock(util.thread.peekStack()).inputs.SUBSTACK.block) {
      console.log(util.target.blocks.getBlock(util.thread.peekStack()).inputs.SUBSTACK.block)
    }
  }
}
Scratch.extensions.register(new TEST_EXTENSION());
