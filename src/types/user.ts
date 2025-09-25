export interface User {
  id: string;
  name: string;
  email: string;
  dept: string;
  manager: string;
}

export interface Endpoint {
  host: string;
  os: string;
  agent: string;
  last_seen: string;
}
