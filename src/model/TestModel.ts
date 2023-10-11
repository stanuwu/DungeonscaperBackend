import ApiTest from '../api/ApiTest';

export default class TestModel {
    public static test(): ApiTest {
        return new ApiTest('TestController Data');
    }
}
