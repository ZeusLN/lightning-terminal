import { action, toJS } from 'mobx';
import { actionLog as log } from 'util/log';
import LndApi from 'api/lnd';
import { Store } from 'store';

/**
 * Action used to update node info state in the store with responses from
 * the GRPC APIs
 */
class NodeAction {
  private _store: Store;
  private _lnd: LndApi;

  constructor(store: Store, lnd: LndApi) {
    this._store = store;
    this._lnd = lnd;
  }

  /**
   * fetch node info from the LND RPC
   */
  @action.bound async getInfo() {
    log.info('fetching node information');
    this._store.info = await this._lnd.getInfo();
    log.info('updated store.info', toJS(this._store.info));
  }
}

export default NodeAction;
