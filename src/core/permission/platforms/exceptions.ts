export class NotSupportCameraError extends Error {
  constructor() {
    super('카메라를 지원하지 않습니다.');
  }
}
