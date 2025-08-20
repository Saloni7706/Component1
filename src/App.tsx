import React, { useState } from "react";
import { InputField } from "./components/InputField";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="w-96 space-y-4">
        {/* Email input with clear button */}
        <InputField
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText="We'll never share your email."
          variant="outlined"
          size="md"
          clearable
          loading={loading}
        />

        {/* Password input with toggle + clear */}
        <InputField
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          invalid={password.length > 0 && password.length < 8}
          errorMessage="Password must be at least 8 characters"
          variant="filled"
          size="lg"
          clearable
          loading={loading}
        />

        {/* Button to simulate loading */}
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000); // fake API call
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Simulate Loading
        </button>
      </div>
    </div>
  );
}

export default App;
