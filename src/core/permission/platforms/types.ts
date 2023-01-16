export type PermissionClassType = {
  check(): Promise<void>;
  checkLocation(): Promise<void>;
  checkCamera(): Promise<void>;
};
