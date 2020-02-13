import React from 'react';
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Sessions from '../components/sessionList';

const mockStore = configureMockStore();
const store = mockStore({});

describe("Sessions Component", () => {
  it("should render without throwing an error", () => {
      expect(
          shallow(
              <Provider store={store}>
                  <Sessions />
              </Provider>
          ).exists(<h1>Session component</h1>)
      );
  });
});