// Async Function Wrapper

const genericWrap = async (message: string, callback: CallableFunction) => {
  try {
    return await callback();
  } catch (e) {
    throw new Error(`${message} -:> ${e}`);
  }
};
export { genericWrap };
