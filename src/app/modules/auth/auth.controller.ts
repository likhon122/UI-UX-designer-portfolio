import { ENV } from '../../config';
import catchAsync from '../../utils/catchAsync';
import { successResponse } from '../../utils/response';
import {
  changePasswordHandler,
  getAccessTokenHandler,
  loginHandler,
  logOutHandler,
  registerUserHandler,
  resetPasswordHandler,
  signUpHandler,
} from './auth.service';

const login = catchAsync(async (req, res) => {
  const result = await loginHandler(req.body);

  const { accessToken, refreshToken, user } = result;

  // set Refresh Token in http-only cookie
  res.cookie('refreshToken', refreshToken, {
    secure: ENV.envMode === 'production', // Set to true in production
    httpOnly: true,
    sameSite: 'strict',
  });

  return successResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: 200,
    data: {
      user,
      accessToken,
    },
  });
});

const signUp = catchAsync(async (req, res) => {
  const result = await signUpHandler(req.body);
  return successResponse(res, {
    success: true,
    message: `We have sent a verification link to your email please verify. This email valid just 5 minute!`,
    statusCode: 200,
    data: {
      token: ENV.envMode === 'production' ? '' : result.token,
    },
  });
});

const registerUser = catchAsync(async (req, res) => {
  const result = await registerUserHandler(req.body);

  const { accessToken, refreshToken, user, customer } = result;

  // set Refresh Token in http-only cookie
  res.cookie('refreshToken', refreshToken, {
    secure: ENV.envMode === 'production', // Set to true in production
    httpOnly: true,
    sameSite: 'strict',
  });

  return successResponse(res, {
    success: true,
    message: '',
    statusCode: 201,
    data: {
      user,
      customer,
      accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const token = await changePasswordHandler(req.body);
  return successResponse(res, {
    success: true,
    message: 'Password reset link has been sent to your email.',
    statusCode: 200,
    data: {
      token: ENV.envMode === 'production' ? '' : token,
    },
  });
});

const resetPassword = catchAsync(async (req, res) => {
  await resetPasswordHandler(req.body, req.headers.authorization);

  return successResponse(res, {
    success: true,
    message: 'Reset password functionality is not implemented yet.',
    statusCode: 200,
    data: {},
  });
});

const getAccessToken = catchAsync(async (req, res) => {
  const result = await getAccessTokenHandler(req.cookies.refreshToken);
  return successResponse(res, {
    success: true,
    message: 'New access token generated successfully',
    statusCode: 200,
    data: result,
  });
});

const logout = catchAsync(async (req, res) => {
  const result = logOutHandler(req.cookies, res);
  successResponse(res, {
    success: true,
    message: 'Logout successful',
    statusCode: 200,
    data: result,
  });
});

export {
  login,
  signUp,
  registerUser,
  changePassword,
  resetPassword,
  getAccessToken,
  logout,
};
