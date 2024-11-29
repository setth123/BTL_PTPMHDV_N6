export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'authentication',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pageRoot}/dashboard`,
  task: `/${rootPaths.pageRoot}/task`,
  mentors: `/${rootPaths.pageRoot}/mentors`,
  messages: `/${rootPaths.pageRoot}/messages`,
  settings: `/${rootPaths.pageRoot}/settings`,

  signin: `/${rootPaths.authRoot}/signin`,
  signup: `/${rootPaths.authRoot}/signup`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  404: `/${rootPaths.errorRoot}/404`,
};
