import type { ComponentResolver } from "unplugin-vue-components";
import Components from "unplugin-vue-components/vite";
import type { PluginOption } from "vite";

export function createVueComponentsPluginConfig(): PluginOption {
  return Components({
    extensions: ["vue"],
    include: [/\.vue$/, /\.vue\?vue/],
    dts: "autoResolver/components.d.ts",
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    resolvers: [
      CelerisAdminResolver(),
    ],
  });
}
/**
 * Resolver for CelerisAdmin
 *
 * @author @kirklin
 */
export function CelerisAdminResolver(): ComponentResolver {
  return {
    type: "component",
    resolve: (name: string) => {
      const antName = name.replace(/^A/, "");
      // Resolver for Ant Design Vue
      if (name.match(/^(A[A-Z]|a-[a-z])/)) {
        return { name: antName, as: name, from: "@celeris/ca-components" };
      }
      if (name.match(/^(CA[A-Z]|ca-[a-z])/)) {
        return { name, from: "@celeris/components" };
      }
    },
  };
}
