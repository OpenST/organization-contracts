// Copyright 2019 OpenST Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//
// ----------------------------------------------------------------------------
// Test: lib/utils.js
//
// http://www.simpletoken.org/
//
// ----------------------------------------------------------------------------

const Assert = require('assert');
const web3 = require('./web3.js');

class Utils {
  /**
   * Asserts no events in the receipt.
   * @param result Receipt
   */
  static expectNoEvents(result) {
    Assert.equal(
      result.receipt.logs.length,
      0,
      'expected empty array of logs',
    );
  }

  /**
   * Expect failure from invalid opcode or out of gas, but returns error
   * instead.
   * @param promise Contract method call.
   * @param expectedMessage Message needs to be asserted.
   */
  static async expectThrow(promise, expectedMessage) {
    try {
      await promise;
    } catch (error) {
      if (expectedMessage !== undefined) {
        Utils._assertExpectedMessage(expectedMessage, error);
      } else {
        const invalidOpcode = error.message.search('invalid opcode') > -1;
        const outOfGas = error.message.search('out of gas') > -1;
        // Latest TestRPC has trouble with require
        const revertInstead = error.message.search('revert') > -1;
        const invalidAddress = error.message.search('invalid address') > -1;

        assert(
          invalidOpcode || outOfGas || revertInstead || invalidAddress,
          `Expected throw, but got ${error} instead`,
        );
      }

      return;
    }
    assert(false, 'Did not throw as expected');
  }

  /**
   * Asserts that a given ethereum call/transaction leads to a revert. The
   * call/transaction is given as a promise.
   *
   * @param {promise} promise Awaiting this promise must lead to a revert.
   * @param {string} expectedMessage If given, the returned error message must
   *                                 include this string (optional).
   */
  static async expectRevert(promise, expectedMessage) {
    try {
      await promise;
    } catch (error) {
      assert(
        error.message.search('revert') > -1,
        `The contract should revert. Instead: ${error.message}`,
      );

      Utils._assertExpectedMessage(expectedMessage, error);
      return;
    }

    assert(false, 'Did not revert as expected.');
  }

  static async advanceBlock() {
    await web3.currentProvider.send(
      {
        jsonrpc: '2.0',
        method: 'evm_mine',
        id: new Date().getTime(),
      },
      (err) => {
        assert.strictEqual(err, null);
      },
    );
  }

  /**
   * Asserts that an error message contains a string given as message. Always
   * passes if the message is `undefined`.
   * @private
   * @param {string} message A regular expression that the error should contain.
   * @param {Object} error The error.
   */
  static _assertExpectedMessage(message, error) {
    if (message !== undefined) {
      assert(
        error.message.search(message) > -1,
        `The contract was expected to error including "${message}", but instead: "${error.message}"`,
      );
    }
  }

  static get NULL_ADDRESS() {
    return '0x0000000000000000000000000000000000000000';
  }
}

module.exports = Utils;
