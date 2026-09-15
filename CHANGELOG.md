# Changelog

## [15.09.2026 21:27] (UTC+4)

- Added a CHANGELOG due to a month long pause. Better to keep track of changes overtime.

| Handler / File         | Git Status           | Connected to API                          | Assessment |
|------------------------|----------------------|-------------------------------------------|------------|
| `Registration.Handler` | Modified (small fix) | Yes (POST `api/v1/auth/register`)         | `IEmailVerifiedService` not defined |
| `OAuth.Login.Handler`  | New / Untracked      | Yes (POST `api/v1/oauth/google/callback`) | Structurally complete |
| `LoginUser.Handler`    | Modified             | Yes (POST `/api/v1/auth/login` )          | Broken, compile errors |
| `GetProfile.Handler`   | New / Untracked      | No                                        | Wrong DTO, Type mis-match |
| `UpdateProfile.Handler`| New / Untracked      | No                                        | Wrong command fields, invalid return type |
| `Logout.Handler`       | Committed            | No                                        | Typos, missing comand, wrong domain property names |
| `VerifyEmail.Handler` | Committed             | No                                        | Typos, missing command, wrong domain property names |

### Commands With No Handlers

- `ForgotPassword.Command.cs`
- `ResetPassword.Command.cs`
- `RefreshSession.Command.cs`
- `DeleteAccount.Command.cs`

### Last Progress (1 mo. ago)

#### `LoginUser.Handler.cs` Edited

- Checks `command.Auth` instead of `merchant.Auth`
- Use `merchant.id` / undefined `merchantId`
- Return `LoginResponse` while the method signature says `AuthTokenResult`
- Command & reference mismatch

#### Email verification handler & command/domain mismatch

- `VerifyEmailCommand` doesn't exist
- `ReqyesrEmailVerifyCommand` - implied but structurally different
- `auth.ExpiryDate` & `EmailVerificationTokenExpiry` mismatch
- `RequestEmailVerificationHanlder` & `VerifyEmailHanlder` typos

#### `GetProfile` & `UpdateProfile` not finished

- `GetProfileCommand.Id` is a string, repo expects a Guid
- `ProfileDto` expects `EmailVerified`, handler passes API keys into the slot
- `UpdateProfileCommand` has `UserId`, handler reads `command.id` and `command.Auth`

### Debug Result

`dotnet build` -> 33 errors
