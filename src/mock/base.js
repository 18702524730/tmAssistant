import Flyio from '@/plugins/flyio/interceptors'
import MockAdapter from 'fly-mock-adapter'
var mock = new MockAdapter(Flyio, { delayResponse: 200 });
export default mock;


