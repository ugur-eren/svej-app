export default {
  // Max File Size in bytes (30MB)
  maxFileSize: 1024 * 1024 * 200,
  maxMediasPerPost: 9,
  maxImageDimension: 1080,

  usernameMinLength: 4,
  usernameMaxLength: 20,
  passwordMinLength: 6,
  passwordMaxLength: 512,

  postDescriptionMaxLength: 1024,
  postDescriptionMaxLines: 10,
  postsPerPage: 10,

  commentMaxLength: 512,
  commentMaxLines: 5,

  relationsPerPage: 20,
} as const;
