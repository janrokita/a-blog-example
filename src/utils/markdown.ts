import markdownit from "markdown-it";
import markdownitmeta from "./markdown-meta";

const md = markdownit({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
});

const proxy = (tokens: any, idx: any, options: any, env: any, self: any) =>
  self.renderToken(tokens, idx, options);
const defaultRenderer = md.renderer.rules.link_open || proxy;

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  tokens[idx].attrSet("target", "_blank");

  return defaultRenderer(tokens, idx, options, env, self);
};

md.use(markdownitmeta);

export default md;
