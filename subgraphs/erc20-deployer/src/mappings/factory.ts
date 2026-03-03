import { TokenCreated } from "../types/ERC20Factory/ERC20Factory";
import { Token } from "../types/schema";

export function handleTokenCreated(event: TokenCreated): void {
  const token = new Token(event.params.token);

  token.owner = event.params.owner;
  token.symbol = event.params.symbol;
  token.name = event.params.name;
  token.decimals = event.params.decimals;
  token.description = event.params.description;
  token.logo = event.params.logo;
  token.banner = event.params.banner;
  token.website = event.params.website;
  token.x = event.params.x;
  token.telegram = event.params.telegram;
  token.discord = event.params.discord;
  token.totalSupply = event.params.totalSupply;

  token.save();
}