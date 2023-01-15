interface IFlag {
  loading: boolean;
  success: boolean;
  fail: boolean;
  visible: boolean;
  dirty: boolean;
}

const INITIAL_FLAGS: IFlag = {
  loading: false,
  success: false,
  fail: false,
  visible: true,
  dirty: false
};

export { IFlag, INITIAL_FLAGS };
