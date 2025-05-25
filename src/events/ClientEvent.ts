import type { SakuClient } from "../SakuClient";

export abstract class ClientEvent<EventArgs extends any[] = any[]> {
  public abstract name: string;
  public once = false;
  protected client: SakuClient;

  constructor(client: SakuClient) {
    this.client = client;
  }

  abstract run(...args: EventArgs): Promise<void>;
}