const LogInForm = () => {
  return (
    <>
      <form className="flex flex-col gap-4 mb-4">
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="email"> Enter your Email</label>
          <input
            className="border-2 border-gray-700 rounded-2xl p-2"
            id="email"
            name="email"
            placeholder="Email"
          />
        </fieldset>
        <fieldset className="flex flex-col gap-4">
          <label htmlFor="password"> Enter your Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder=" Enter your Password"
            className="border-2 border-gray-700 rounded-2xl p-2"
          />
        </fieldset>
        <button type="submit" className="button-secondary w-1/2 mx-auto">
          Login
        </button>
      </form>
    </>
  );
};

export default LogInForm;
