export const TYPES = {
  // Database layer
  PrismaProvider: Symbol.for('PrismaProvider'),
  UnitOfWork: Symbol.for('UnitOfWork'),

  // Repository layer
  UserRepository: Symbol.for('UserRepository'),
  LeaveRequestRepository: Symbol.for('LeaveRequestRepository'),
  HourRequestRepository: Symbol.for('HourRequestRepository'),
  AttendanceRepository: Symbol.for('AttendanceRepository'),

  // Utility services
  EmailService: Symbol.for('EmailService'),
  TokenService: Symbol.for('TokenService'),
  PasswordService: Symbol.for('PasswordService'),

  // Image handling
  CloudinaryConfig: Symbol.for('CloudinaryConfig'),
  ImageService: Symbol.for('ImageService'),

  // Validators
  LeaveRequestValidator: Symbol.for('LeaveRequestValidator'),
  HourRequestValidator: Symbol.for('HourRequestValidator'),

  // Domain services
  UserService: Symbol.for('UserService'),
  AuthService: Symbol.for('AuthService'),
  LeaveRequestService: Symbol.for('LeaveRequestService'),
  HourRequestService: Symbol.for('HourRequestService'),
  StatsService: Symbol.for('StatsService'),
  AttendanceService: Symbol.for('AttendanceService'),

  // Processors
  LeaveAttendanceProcessor: Symbol.for('LeaveAttendanceProcessor'),
  HourlyLeaveProcessor: Symbol.for('HourlyLeaveProcessor'),
  DefaultAttendanceProcessor: Symbol.for('DefaultAttendanceProcessor'),
  PendingRequestProcessor: Symbol.for('PendingRequestProcessor'),

  // Controllers
  UserController: Symbol.for('UserController'),
  AuthController: Symbol.for('AuthController'),
  LeaveRequestController: Symbol.for('LeaveRequestController'),
  HourRequestController: Symbol.for('HourRequestController'),
  AttendanceController: Symbol.for('AttendanceController'),
  PasswordController: Symbol.for('PasswordController'),
  StatsController: Symbol.for('StatsController'),
}
