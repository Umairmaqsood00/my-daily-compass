import { r as reactExports } from "../_libs/react.mjs";
import { A as AuthContext } from "./router-Be_1-VPB.mjs";
function useAuth() {
  const context = reactExports.useContext(AuthContext);
  if (context === void 0) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
export {
  useAuth as u
};
