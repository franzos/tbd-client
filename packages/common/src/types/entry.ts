import { PublicFile } from "./file.js";
import { PublicUser } from "./user.js";

export interface PublicEntry {
  id: string;
  id_with_local_part: string;
  type: string;
  data: any;
  files?: PublicFile[];
  created_by?: PublicUser;
  created_at: string;
  updated_at: string;
}
