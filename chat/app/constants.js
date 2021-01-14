/**
 * The node-module to hold the constants for the server
 */
const i18n = require('./util/i18n');
const myContext = this;
const config = require('config');
const _ = require('underscore');
const _l = require('lodash');

function define(obj, name, value) {
    Object.defineProperty(obj, name, {
        value,
        enumerable: true,
        writable: false,
        configurable: true,
    });
}

const debugging = false;

exports.responseFlags = {};
exports.responseFlags = {};
exports.responseMessages = {};

define(exports.responseMessages,'TRACKING_ORDER_NOT_FOUND','Tracking order not found');
define(exports.responseMessages,'PACKAGE_PICK','Order are pickup from source');
define(exports.responseMessages, 'PLANT_VALIDATION_FAILED', 'Ivalid werks or bukrs value.');
define(exports.responseMessages, 'INVALID_UPLOADER_TYPE', 'Invalid uploader type');
define(exports.responseMessages, 'KATO_LOGIN_ACCESS_TOKEN_SUCCESS', 'Login Successfully');
define(exports.responseMessages, 'PARAMETER_MISSING', 'Insufficient information was supplied. Please check and try again.');
define(exports.responseMessages, 'CANNOT_RATE', 'Sorry, you do not have permission to rate the contract');
define(exports.responseMessages, 'CANNOT_COMMENT_UPLOAD', 'Sorry, you do not have permission to upload or comment over the contract');
define(exports.responseMessages, 'CANNOT_DOWNLOAD_SHARE', 'Sorry, you do not have permission to download or share audit details');
define(exports.responseMessages, 'INVALID_WEIGHTAGE', 'Overall weight of questions is invalid!');
define(exports.responseMessages, 'INVALID_CRITERIA', 'Criteria does not match the scale type!');
define(exports.responseMessages, 'INVALID_RATING', 'Rating does not match the criteria!');
define(exports.responseMessages, 'INCORRECT_PARAMETER', 'Incorrect parameter was supplied. Please check and try again.');
define(exports.responseMessages, 'FLEET_NOT_AVAILABLE', 'Agent not available at specified time.');
define(exports.responseMessages, 'FLEET_EMAIL_ALREADY_EXISTS_WITH_YOU', 'This email ID is already exists in your account.');
define(exports.responseMessages, 'LOGIN_ID_ALREADY_EXISTS', 'This username is already registered. Please try with different Username.');
define(exports.responseMessages, 'FLEET_EMAIL_ALREADY_EXISTS', 'This email ID is already registered. Please try with different ID.');
define(exports.responseMessages, 'FLEET_EMAIL_NOT_INVITED_BY_ANYONE', 'You are not invited by anyone yet.');
define(exports.responseMessages, 'JOB_NOT_MAPPED_WITH_YOU', 'This task is no longer available.');
define(exports.responseMessages, 'REGISTRATION_SUCCESSFUL', 'Registration Successful');
define(exports.responseMessages, 'ACCOUNT_NOT_VERIFIED', "You havn't set your password yet. Please check your email for creating password.");
define(exports.responseMessages, 'ACCOUNT_NOT_REGISTERED_PROPERLY', 'You have not registered properly. Please signup again.');
define(exports.responseMessages, 'ACCOUNT_EXPIRE', 'Your account has been expired. Please choose a plan in billings page to continue.');
define(exports.responseMessages, 'INVALID_ACCESS_TOKEN', 'Session expired. Please logout and login again.');
define(exports.responseMessages, 'INVALID_USER_TYPE', 'User type is invalid.');
define(exports.responseMessages, 'INVALID_URL', 'Oops!! URL not found.');
define(exports.responseMessages, 'INVALID_USERNAME', 'This username is not registered with us.');
define(exports.responseMessages, 'WRONG_PASSWORD', 'Incorrect Password.');
define(exports.responseMessages, 'CURRENT_PASSWORD_INCORRECT', 'Incorrect Current Password.');
define(exports.responseMessages, 'INCORRECT_PASSWORD', 'Incorrect Password.');
define(exports.responseMessages, 'ACTION_COMPLETE', 'Successful');
define(exports.responseMessages, 'ACTION_COMPLETE1', 'order is placed Successfully');
define(exports.responseMessages, 'ACTION_COMPLETE_2', 'Importing in progress. Notify you via email when done.');
define(exports.responseMessages, 'LOGIN_SUCCESSFULLY', 'Logged in successfully.');
define(exports.responseMessages, 'SHOW_ERROR_MESSAGE', 'Some error occurred. Please refresh the page and try again.');
define(exports.responseMessages, 'IMAGE_FILE_MISSING', 'Image file is missing.');
define(exports.responseMessages, 'ERROR_IN_EXECUTION', 'Some error occurred while executing. Please refresh the page and try again.');
define(exports.responseMessages, 'DATA_NOT_FOUND', 'We couldn\'t find any data in our database');
define(exports.responseMessages, 'UPLOAD_ERROR', 'Error in uploading.');
define(exports.responseMessages, 'PASSWORD_CHANGED_SUCCESSFULLY', 'Password changed successfully.');
define(exports.responseMessages, 'EMAIL_ALREADY_EXISTS', 'This email ID is already registered.');
define(exports.responseMessages, 'TEAM_NAME_ALREADY_REGISTERED_WITH_YOU', 'Team name already exists.');
define(exports.responseMessages, 'INACTIVE_ACCOUNT', 'Your account is not active or blocked by admin. Please contact your admin.');
define(exports.responseMessages, 'INVALID_ACCESS', 'Session is expired , login again.');
define(exports.responseMessages, 'INVALID_PICKUP', 'Pickup time should be greater than current time.');
define(exports.responseMessages, 'INVALID_SCHEDULE_DATE', 'Schedule time should be greater than current time.');
define(exports.responseMessages, 'INVALID_SCHEDULE_DATE_BID', 'Scheduled time must be greater than bid event end time');
define(exports.responseMessages, 'INVALID_FORECAST_DATE', 'Forecast date should be greater than scheduled date.');
//@TODO :- fetch app name from config.
define(exports.responseMessages, 'INVALID_ACCESS_TOKEN_FLEET', `We're sorry, another session of the Scopeworker app has been started. You've been logged out.`);
define(exports.responseMessages, 'INVALID_DELIVERY', 'Delivery time should be greater than current time.');
define(exports.responseMessages, 'EMAIL_REGISTERED_ALREADY', 'Email already exists.');
define(exports.responseMessages, 'PHONE_REGISTERED_ALREADY', 'Phone number already exists.');
define(exports.responseMessages, 'PICKUP_NOT_COMPLETED', 'Pickup not fully completed yet. Please complete pickup task first.');
define(exports.responseMessages, 'JOB_NOT_COMPLETED', 'This ride is already canceled by rider.');
define(exports.responseMessages, 'PASSWORD_ERROR', 'Password must be between 7 to 15 characters which contain at least one numeric digit and a special character.');
define(exports.responseMessages, 'APP_PASSWORD_ERROR', `Password must be greater than ${config.get('AppPasswordLength')} characters.`);
define(exports.responseMessages, 'NO_PICKUP_OR_DELIVERY_ERROR', 'Please select either Pickup or Delivery with your work flow.');
define(exports.responseMessages, 'WORKFLOW_NOT_MATCHED', 'Workflow has been changed. Please logout from dashboard and login again.');
define(exports.responseMessages, 'NO_TEAMS_AVAILABLE', 'No team is available.');
define(exports.responseMessages, 'NO_DISPATCHERS_AVAILABLE', 'No manager is available.');
define(exports.responseMessages, 'EMAIL_NOT_EXISTS', 'This account is not registered with us.');
define(exports.responseMessages, 'ACTION_NOT_ALLOWED', 'This action is not permissible at this time.');
define(exports.responseMessages, 'ACTION_NOT_ALLOWED_TO_VENDOR', `This action is not allowed to ${i18n.__('vendor')}`);
define(exports.responseMessages, 'FLEET_OFFLINE_ERROR', 'Please switch to On-Duty mode before this action.');
define(exports.responseMessages, 'JOB_COMPLETED', 'This ride is already complete.');
define(exports.responseMessages, 'RIDE_CANCELED', 'This ride is already canceled by rider.');
define(exports.responseMessages, 'ACCOUNT_DELETED_ERROR', 'Your account has been deleted. Please contact the administrator.');
define(exports.responseMessages, 'SAME_PASSWORD_ERROR', 'Old and new password should be different.');
define(exports.responseMessages, 'CARD_ADDED_SUCCESSFULLY', 'Card has been added successfully.');
define(exports.responseMessages, 'CARD_UPDATE_SUCCESSFULLY', 'Card has been updated successfully.');
define(exports.responseMessages, 'CARD_ALREADY_ADDED', 'Card is already added.');
define(exports.responseMessages, 'CARD_NOT_ADDED_ERROR', 'Please add credit card to update.');
define(exports.responseMessages, 'NO_DATA_FOUND', 'No data found.');
define(exports.responseMessages, 'UPDATE_BILLING_PLAN', 'Billing Plan has been successfully updated.');
define(exports.responseMessages, 'SAME_BILLING_PLAN', 'Your are trying to update same plan as you already have. Please look into it.');
define(exports.responseMessages, 'LOCATION_NOT_FETCHED_ERROR', 'Could not locate the address entered. Please check the address and try again.');
define(exports.responseMessages, 'EXCEED_FLEET_COUNT', 'You can use only <%FLEET%> with this plan.');
define(exports.responseMessages, 'INVALID_FORMAT', 'Please check the CSV format and try again.');
define(exports.responseMessages, 'INVALID_DATE_FORMAT', 'Incorrect date format. Please use as (MM/DD/YYYY mm:hh)');
define(exports.responseMessages, 'INVALID_DATE_FORMAT2', 'Incorrect date format. Please use as (YYYY-MM-DD HH:mm:ss)');
define(exports.responseMessages, 'INVALID_EMAIL_FORMAT', 'Please check email format.');
define(exports.responseMessages, 'CSV_ROWS_ERROR', 'Rows should not be greater than <%VALUE%> at a time.');
define(exports.responseMessages, 'TASKS_COUNT_ERROR', 'You have reached your monthly quota. Please upgrade your plan for more usage.');
define(exports.responseMessages, 'DELETE_TEAM_WARNING', 'If you delete a team, you will not be able to see <%FLEET%> assigned to that team on map. Please add them to a different team.');
define(exports.responseMessages, 'FLEET_ALREADY_IN_OTHER_TEAM', 'Some of the fleets are already part of any other team. Please remove them from their list first.');
define(exports.responseMessages, 'MONTHLY_BILLING_DECLINED', 'Your monthly billing has been declined. Please update your card details and then click on Pay Now to avoid any hindrance.');
define(exports.responseMessages, 'MONTHLY_BILLING_SUCCESSFUL', 'Your monthly billing has successfully deducted.');
define(exports.responseMessages, 'DELIVERY_NOT_FIRST', 'Delivery task should be prior than Pickup task. Please drag the tasks again.');
define(exports.responseMessages, 'SIZE_EXCEEDS', 'Size should be under 1 MB.');
define(exports.responseMessages, 'ACCOUNT_NOT_REGISTER', 'This account is not registered with ');
define(exports.responseMessages, 'UPLOAD_TASKS_PROCESS_ERROR', 'Your previous uploaded tasks are in progress. Please wait or come back in approx. in ');
define(exports.responseMessages, 'INVALID_POINT', 'Invalid points was supplied.');
define(exports.responseMessages, 'ERROR_IN_FLEET_CSV', 'Fleet addition stopped at the $index$ row in the uploaded csv file due to the error - ');
define(exports.responseMessages, 'AGENT_CSV_UPLOAD_SUCCESS', ' Agents Added Successfully.');
define(exports.responseMessages, 'ADD_ON_ACTIVATED', 'Add-on Activated');
define(exports.responseMessages, 'ADD_ON_NOT_AVAILABLE', 'Add-on not available');
define(exports.responseMessages, 'CREDIT_CARD_EXPIRED', 'Credit card expired');
define(exports.responseMessages, 'ADD_ON_DEACTIVATED', 'Add-on Deactivated');
define(exports.responseMessages, 'PASSWORD_SENT', 'Password instructions just mailed to <%EMAIL%> account.');
define(exports.responseMessages, 'EXPORT_ERROR_MESSAGE', "Your export has been queued, and we'll send you an email when it's done.");
define(exports.responseMessages, 'BILLING_PLAN_CHANGED_FOR_TODAY', 'You have already changed your plan once. Please try again tomorrow.');
define(exports.responseMessages, 'MASKING_SUCCESS', 'You will be connected shortly.');
define(exports.responseMessages, 'MASKING_ERROR', 'Error in connecting.......');
define(exports.responseMessages, 'PAYMENT_UNSUCCESSFULL', 'Your payment has been declined. Please check card details.');
define(exports.responseMessages, 'BULK_BILLING_PLAN_ERROR', 'This service is not available for you. Please contact admin.');
define(exports.responseMessages, 'VENDOR_NOT_FOUND', `No Data found related to this ${i18n.__('vendor')}`);
define(exports.responseMessages, 'SUB_VENDOR_NOT_FOUND', `No Data found related to this sub admin`);
define(exports.responseMessages, 'VENDOR_INVALID_CREDENTIALS', 'Either your supplied Email ID or Password is incorrect');
define(exports.responseMessages, 'VENDOR_FORM_EXISTS', 'You have one or more custom form(s) enabled for your account. Please delete them before disabling this Add On.');
define(exports.responseMessages, 'REGION_ALREADY_EXIST', 'This name is already used as one of the existing regions. Please enter another name.');
define(exports.responseMessages, 'REGION_INVALID', 'This Region Data is invalid. Please verify');
define(exports.responseMessages, 'REGION_NOT_INSERTED', 'There was an error creating the Region. Please try again after some time.');
define(exports.responseMessages, 'REGION_NOT_DELETED', 'There was an error in deleting the region. Please try again after some time.');
define(exports.responseMessages, 'REGION_OVERLAP', 'Please note that this Region intersects with an existing region. [ Also, since we are in Beta release of this feature, sometimes regions within a few kms of each other are flagged as overlapping. We are working on optimizing this and will soon resolve this warning.]');
define(exports.responseMessages, 'INVALID_JOB_STATUS', 'Only unassigned tasks can be auto-assigned.');
define(exports.responseMessages, 'DOMAIN_NOT_AVAILABLE', 'This Domain Name in not available. Please try again with another name.');
define(exports.responseMessages, 'DOMAIN_NOT_CREATED', 'Something went wrong while creating this domain. Please try again.');
define(exports.responseMessages, 'DOMAIN_NOT_FOUND', 'No Data found for this Domain Name.');
define(exports.responseMessages, 'DOMAIN_CREATION_SUCCESS', 'Successful!! Domain may take several minutes to up.');
define(exports.responseMessages, 'FORM_SETTINGS_NOT_FOUND', 'No Data found for this Domain. Please try again.');
define(exports.responseMessages, 'ALREADY_EXIST', 'Keys for this account already exist');
define(exports.responseMessages, 'SMS_SETTINGS_NOT_FOUND', 'Keys for this account does not exist');
define(exports.responseMessages, 'GEOFENCE_ERROR', 'Geofencing will only be done when auto assignment is on.');
define(exports.responseMessages, 'GEOFENCE_FLEET_NOT_FOUND', 'No Agent found in this geofence.');
define(exports.responseMessages, 'DISTANCE_CALC_ERROR', 'Error in distance calculation.');
define(exports.responseMessages, 'INVOICE_MODULE_DISABLE', 'Invoicing module has been disabled from admin.');
define(exports.responseMessages, 'EXPIRY_DATE_LESS_THAN_CURRENT_DATE', 'Expiry Date is less than the current date');
define(exports.responseMessages, 'DEACTIVATE_MASKING_BEFORE_MESSAGING', 'You have to first deactivate number masking');
define(exports.responseMessages, 'DUPLICATE_ENTRY', 'This number is already with you.');
define(exports.responseMessages, 'INVALID_EMAIL_PASSWORD', 'Email/password is incorrect.');
define(exports.responseMessages, 'SUCCESS_LOGIN', 'You have logged in successfully.');
define(exports.responseMessages, 'LINE_ITEMS_REQUIRED', 'Line items are required');
define(exports.responseMessages, 'PENDING_APPROVAL', 'You already have pending POR');
define(exports.responseMessages, 'INVALID_TICKET', 'Ticket id not found.');
define(exports.responseMessages, 'INVALID_BID_EVENT', 'Bid event id not found.');
define(exports.responseMessages, 'INVALID_JOB', 'Job id not found.');
define(exports.responseMessages, 'TICKET_NOT_AVAILABLE', `The schedule date of this ticket is in the past, so you can't accept it now. Please contact ${i18n.__('company')} owner in order to reschedule ticket.`);
define(exports.responseMessages, 'VIDEO_NOTIFICATION', 'Video notification raised');
define(exports.responseMessages, 'LOGOUT_NOTIFICATION', 'Log out notification raised'); // silent push message when fleet has logout from one device
define(exports.responseMessages, 'VIDEO_NOTIFICATION_CLOSED', 'Video notification closed');
define(exports.responseMessages, 'HELP_MODE_RAISED', 'Help raised from agent.');
define(exports.responseMessages, 'VERSION_NOT_FOUND', 'Document Not Found');
define(exports.responseMessages, 'NO_UNIT_FOUND', 'Unit Not Found');
define(exports.responseMessages, 'ACCEPT_TICKET', 'Ticket Not Accepted');
define(exports.responseMessages, 'INVALID_CUSTOM_TEMPLATE', 'Invalid Custom Template Format');
define(exports.responseMessages, 'VENDOR_CHANGE_ORDER_ON_PENDING_CLIENT', `To process a new Change Order the current POR Pending ${i18n.__('client')} Approval either needs to be Approved/Rejected by ${i18n.__('client')} or Cancelled by ${i18n.__('vendor')}(your ${i18n.__('company').toLowerCase()}) prior to reattempting`);
define(exports.responseMessages, 'VENDOR_CHANGE_ORDER_ON_PENDING_VENDOR', `To process a new Change Order the current POR Pending ${i18n.__('vendor')} Approval either needs to be Approved/Rejected by ${i18n.__('vendor')} or Cancelled by ${i18n.__('client')}(your ${i18n.__('company').toLowerCase()}) prior to reattempting`);
define(exports.responseMessages, 'VENDOR_CHANGE_ORDER_ON_PENDING_INVOICE', `To process a new Change Order the current Invoice Pending Approval either needs to be Cancelled by ${i18n.__('vendor')}(your ${i18n.__('company').toLowerCase()}) prior to reattempting or Approved/Rejected by ${i18n.__('client')}. Warning - if ${i18n.__('client')} approves the Invoice Pending Approval the PO will be closed and no additional Change Orders can be processed`);
define(exports.responseMessages, 'CLIENT_CHANGE_ORDER_ON_PENDING_INVOICE', `To process a new Change Order the current Invoice Pending Approval either needs to be Rejected by ${i18n.__('client')}(your ${i18n.__('company').toLowerCase()}) prior to reattempting or Cancelled by ${i18n.__('vendor')}. Warning - if ${i18n.__('client')}(your company) approves the Invoice Pending Approval the PO will be closed and no additional Change Orders can be processed`);
define(exports.responseMessages, 'INVALID_CSV', 'Invalid CSV');
define(exports.responseMessages, 'INVALID_BID_ZONE', 'Invalid Bidzone');
define(exports.responseMessages, 'INVALID_REGION', 'Invalid Region');
define(exports.responseMessages, 'SITE_ALREADY_ADDED', 'Site already added');
define(exports.responseMessages, 'SITE_NOT_FOUND', 'Site not found');
define(exports.responseMessages, 'CATALOG_NOT_FOUND', `${i18n.__('catalog')} NOT FOUND`);
define(exports.responseMessages, 'VARITION_ITEM_FOUND', 'VARITION ITEM FOUND');
define(exports.responseMessages, 'CATALOG_ALREADY_EXIST', `${i18n.__('catalog')} ALREADY EXIST`);
define(exports.responseMessages, 'ITEM_ALREADY_EXIST', 'ITEM ALREADY EXIST');
define(exports.responseMessages, 'ITEM_NOT_FOUND', 'ITEM NOT FOUND');
define(exports.responseMessages, 'VARIATION_NOT_FOUND', 'NO VARIATION ITEMS FOUND FOR THIS PURCHASE ORDER.');
define(exports.responseMessages, 'PURCHASE_ORDER_NOT_FOUND', 'Purchase order not found');
define(exports.responseMessages, 'CUSTOM_FIELD_NOT_FOUND', 'Custom field not found');
define(exports.responseMessages, 'CUSTOM_FIELD_APPROVAL_NOT_REQUIRED', 'Workflow Field has been already approved/rejected, please refresh your page to see the changes.');
define(exports.responseMessages, 'PURCHASE_ORDER_ALREADY_EXIST', 'Purchase order already exist');
define(exports.responseMessages, 'INVALID_CREW_TYPE', 'Invalid Crew Type');
define(exports.responseMessages, 'INVALID_COMPANY_ID', `Invalid ${i18n.__('company')} Id`);
define(exports.responseMessages, 'INVALID_STATUS_SELECTION', 'You are already active on some other ticket');
define(exports.responseMessages, 'MOVEMENT_FLEET_NOT_FOUND', 'Path not found for this ticket.');
define(exports.responseMessages, 'CATEGORY_NOT_FOUND', 'Category not found');
define(exports.responseMessages, 'SUB_CATEGORY_NOT_FOUND', 'Sub category not found');
define(exports.responseMessages, 'GENERAL_ITEM_FOUND', 'General item found');
define(exports.responseMessages, 'START_LATLONG', 'The Agent has reached the location.');
define(exports.responseMessages, 'ENDING_LATLONG', 'The Agent has Left the location.');
define(exports.responseMessages, 'CATEGORY_ALREADY_EXIST', 'Category already exist');
define(exports.responseMessages, 'NO_VENDOR', `No ${i18n.__('vendor')} found.`);
define(exports.responseMessages, 'UPDATE_SUCCESS', 'Updated successfully.');
define(exports.responseMessages, 'MILESTONE_TEMPLATE_ALREADY_EXISTS', 'Milestone template already exist');
define(exports.responseMessages, 'MILESTONE_ALREADY_EXISTS', 'Milestone already exist');
define(exports.responseMessages, 'SLA_ALREADY_EXISTS', 'Sla by this name already exists.');
define(exports.responseMessages, 'MILESTONE_NAME_ALREADY_EXISTS', 'Milestone name already exists');
define(exports.responseMessages, 'MILESTONE_SHORT_NAME_ALREADY_EXISTS', 'Milestone short name already exists');
define(exports.responseMessages, 'MILESTONE_TEMPLATE_NOT_FOUND', 'Milestone template not found');
define(exports.responseMessages, 'MILESTONES_NOT_FOUND', 'Milestone not found');
define(exports.responseMessages, 'INVALID_MILESTONE_TEMPLATE_ID', 'Invalid Milestone Template Id');
define(exports.responseMessages, 'INVALID_MILESTONE_ID', 'Invalid Milestone Id');
define(exports.responseMessages, 'PRE_REQUISITES_NOT_FOUND', 'PRE REQUISITES NOT FOUND');
define(exports.responseMessages, 'TICKET_DETAILS', 'Ticket details empty.');
define(exports.responseMessages, 'BIDZONE_ALREADY_EXIST', 'Bidzone already exist.');
define(exports.responseMessages, 'INVALID_USER_ID', 'This user is invalid.');
define(exports.responseMessages, 'INVALID_ROLE_NAME', 'This role  already exists! Please try again with another name.');
define(exports.responseMessages, 'INVALID_ROLE_ID', 'This role is invalid.');
define(exports.responseMessages, 'ALREADY_TEMPLATE_NAME', 'This Template name is already exist.');
define(exports.responseMessages, 'INVALID_TEMPLATE_ID', 'This Template id is not found.');
define(exports.responseMessages, 'INVALID_TEMPLATE_FIELD', 'There is no field associated with template..');
define(exports.responseMessages, 'DUPLICATE_SUB_CATEGORIES', 'DUPLICATE SUB-CATEGORIES ARE NOT ALLOWED');
define(exports.responseMessages, 'PROGRAM_ALREADY_EXISTS', 'A Program with this name or short name already exists.');
define(exports.responseMessages, 'PROJECT_ALREADY_EXISTS', 'A Project with this name or short name already exists.');
define(exports.responseMessages, 'PROGRAM_NOT_FOUND', 'Program Not Found');
define(exports.responseMessages, 'PROJECT_NOT_FOUND', 'Project Not Found');
define(exports.responseMessages, 'PROJECT_NOT_VALID', 'Project cannot be edited or made active since there is already a project with same Name/Site ID ');
define(exports.responseMessages, 'INVALID_PROJECT_MODE', 'Invalid Project Mode');
define(exports.responseMessages, 'SITE_ID_REQUIRED', 'Site Id is Required');
define(exports.responseMessages, 'PROJECT_SITE_EXISTS', 'A Project with following Site Id(s) already exists');
define(exports.responseMessages, 'PROGRAM_CANNOT_BE_DELETED', 'Program contains Projects in it,Are you sure you want to delete this?');
define(exports.responseMessages, 'CREW_TYPE_ALREADY_EXISTS', 'RESOURCE TYPE ALREADY EXIST');
define(exports.responseMessages, 'INVALID_MARKET', 'Invalid Market');
define(exports.responseMessages, 'INVALID_SITE', 'Invalid Site');
define(exports.responseMessages, 'NOT_FOUND', 'NOT_FOUND');
define(exports.responseMessages, 'VARIATION_ITEM_ALREADY_EXIST', `Item is Already present for this bidzone in some other ${i18n.__('catalog')}.`);
define(exports.responseMessages, 'MAX_UPLOAD_SIZE_EXCEEDED', 'File size should be under 400 mb');
define(exports.responseMessages, 'ATLEAST_ONE_ITEM_IS_REQUIRED', 'Atleast One item is Required in Purchase order other than miscellaneous item');
define(exports.responseMessages, 'CIRCULAR_DEPENDENCY_FOUND', 'Pre requisite cannot have circular dependencies.');
define(exports.responseMessages, 'CONTRACT_ALREADY_EXIST', 'This contract name already exists. Please try with a different name');
define(exports.responseMessages, 'BUILDER_ALREADY_EXIST', 'This builder contract name is already exists! Please try to another name.');
define(exports.responseMessages, 'NO_CONTRACT_FOUND', 'This contract id is not found..');
define(exports.responseMessages, 'CALL_ALREADY_INPROGRESS', 'The agent is already on a call.');
define(exports.responseMessages, 'CALL_MISSED', 'You have missed the call.');
define(exports.responseMessages, 'INVALID_CONTRACT_ID', 'This contract id is invalid.');
define(exports.responseMessages, 'DUPLICATE_VALUE', 'Duplicate Field names are not allowed.');
define(exports.responseMessages, 'DUPLICATE_SHORT_NAME', 'Duplicate short names are not allowed.');
define(exports.responseMessages, 'CONTRACT_TEMPLATE_NOT_FOUND', 'Contract Template not found');
define(exports.responseMessages, 'MIN_2_MILESTONES', 'Min and Max function requires min 2 milestones as operands');
define(exports.responseMessages, 'MILESTONES_REQUIRED', 'Formula requires exactly two milestones as operands');
define(exports.responseMessages, 'DAYS_ARE_REQUIRED', 'Days and milestone are required for SUB_DATE,SUB_DAYS,ADD_DAYS functions');
define(exports.responseMessages, 'DATE_IS_REQUIRED', 'Date is Required for SUB_DATE function');
define(exports.responseMessages, 'DEFAULT_VALUE_NOT_FOUND', 'Default field does not match with role template.');
define(exports.responseMessages, 'ITEM_NOT_FOUND', 'No item found.');
define(exports.responseMessages, 'AUTH_INVALID', 'auth not valid');
define(exports.responseMessages, 'PAGE_VALUE_NOT_FOUND', 'Please select the correct group name and page value.');
define(exports.responseMessages, 'TRIGGER_REQUIRED', 'Atleast One Trigger is required');
define(exports.responseMessages, 'SLA_REQUIRED', 'Atleast One SLA is required');
define(exports.responseMessages, 'CONTRACT_MILESTONES_REQUIRED', 'Either program/project milestone or contract milestone is required');
define(exports.responseMessages, 'ROLE_CANNOT_BE_DELETED', 'This role is used in some Program or Project or contract template. Please remove its dependencies before deleting it.');
define(exports.responseMessages, 'VENDOR_NO_LONGER_ELIGIBLE', `This ${i18n.__('vendor')} is no longer eligible for this Ticket`);
define(exports.responseMessages, 'VENDOR_NO_LONGER_ELIGIBLE_FOR_BID', `Some of these ${i18n.__('vendors')} are no longer eligible for this Bid Event`);
define(exports.responseMessages, 'FORM_NECESSARY_FIELDS', 'Region, Market, Bid Zone, Site Id, Schedule Start, Due Date Hours are required fields.');
define(exports.responseMessages, 'INVALID_FILE_TYPE', 'Invalid file type.');
define(exports.responseMessages, 'FILE_SIZE_LIMIT_EXCEEDED', 'File size limit exceeded.');
define(exports.responseMessages, 'DUPLICATE_CLASS_NAMES', 'Duplicate class names');
define(exports.responseMessages, 'DUPLICATE_CLASSIFIER_NAME', 'Duplicate classifier names');
define(exports.responseMessages, 'MIN_IMAGES_COUNT', 'Images count cant be less than 10');
define(exports.responseMessages, 'MAX_IMAGES_COUNT', 'Images count cant be greater than 10000');
define(exports.responseMessages, 'CLASSIFIER_NOT_FOUND', 'Classifier not found');
define(exports.responseMessages, 'DEPENDENCIES_EXIST', 'Cannot Remove: Dependencies Exist');
define(exports.responseMessages, 'SITE_ALREADY_EXIST', 'The site id <%VALUE%> that you are trying to add, it is already into ScopeWorker and it is inactive, would you like to activate it and update it with the information provided?');
define(exports.responseMessages, 'CONTACT_NOT_FOUND', 'Contact not found');
define(exports.responseMessages, 'CAN_NOT_EDIT_DATE', 'You do not have permission to edit this date');
define(exports.responseMessages, 'CONTACT_ALREADY_EXIST', 'Contact already exist in system');
define(exports.responseMessages, 'CONTACT_EMAIL_ALREADY_EXIST', 'Contact already exist in system with this email id');
define(exports.responseMessages, 'CONTACT_PHONE_ALREADY_EXIST', 'Contact already exist in system with this phone number');
define(exports.responseMessages, 'COULD_NOT_DELETE_CONTACT', 'This contact could not be deleted');
define(exports.responseMessages, 'REGION_ASSOCIATED_WITH_MARKET', 'This region could not be deactivated, because this region is associated with market(s)');
define(exports.responseMessages, 'REGION_ASSOCIATED_WITH_MARKET_DEACTIVATE_MULTIPLE', 'These regions could not be deactivated, because these regions are associated with market(s)');
define(exports.responseMessages, 'REGION_ASSOCIATED_WITH_MARKET_DELETE', 'This region could not be deleted, because this region is associated with market(s)');
define(exports.responseMessages, 'REGION_ASSOCIATED_WITH_MARKET_DELETE_MULTIPLE', 'These regions could not be deleted, because these regions are associated with market(s)');
define(exports.responseMessages, 'MARKET_ALREADY_EXIST', 'This name is already used as one of the existing markets. Please enter another name.');
define(exports.responseMessages, 'MARKET_ASSOCIATED_WITH_MARKET', 'This market could not be deactivated, because this market is associated with bidzone(s)');
define(exports.responseMessages, 'MARKET_ASSOCIATED_WITH_MARKET_DEACTIVATE_MULTIPLE', 'These markets could not be deactivated, because these markets are associated with bidzone(s)');
define(exports.responseMessages, 'MARKET_ASSOCIATED_WITH_MARKET_DELETE', 'This market could not be deleted, because this market is associated with bidzone(s)');
define(exports.responseMessages, 'MARKET_ASSOCIATED_WITH_MARKET_DELETE_MULTIPLE', 'These markets could not be deleted, because these markets are associated with bidzone(s)');
define(exports.responseMessages, 'POLYGON_INTERSECTING', 'This bidzone intersects with one or more bidzone(s), Please draw a bidzone with unique area.');
define(exports.responseMessages, 'BID_ZONE_NOT_FOUND', 'Bid zone not found');
define(exports.responseMessages, 'BID_ZONE_NAME_ALREADY_EXIST', 'This name is already used as one of the existing bidzones. Please enter another name.');
define(exports.responseMessages, 'CONTACT_NOT_ASSOCIATED_WITH_ANY_SITE', 'This contact is not associated with any site');
define(exports.responseMessages, 'MARKET_NOT_FOUND', 'Market not found');
define(exports.responseMessages, 'CONTACT_ALREADY_ASSOCIATED', '<%CONTACT_NAMES%> is/are already added as <%VALUE%> user at this level');
define(exports.responseMessages, 'ERROR_IN_UPLOADING_IMAGES', 'Error in uploading images to S3');
define(exports.responseMessages, 'ERROR_IN_UPLOADING_CSV', 'Error in uploading csv to S3');
define(exports.responseMessages, 'IBM_WATSON_DISABLED', 'IBM watson is disabled');
define(exports.responseMessages, 'IBM_WATSON_KEY_NOT_FOUND', `IBM watson key is not present for this ${i18n.__('company')}`);
define(exports.responseMessages, 'IBM_IMAGE_FLAG_ERROR_MESSAGE_GRAY', 'Classifier has less image than required');
define(exports.responseMessages, 'TWO_POSITIVE_EXAMPLES_REQUIRED', 'You must supply at least two compressed files, either two positive example files or one positive and one negative example file.');
define(exports.responseMessages, 'SAME_FLEET_REASSIGNMENT', `Same agent can't be reassigned`);
define(exports.responseMessages, 'SAME_USER_REASSIGNMENT', `Same user can't be reassigned`);
define(exports.responseMessages, 'REASSIGNMENT_NOT_ALLOWED', 'This ticket is no longer available for reassignment');
define(exports.responseMessages, 'TICKET_ALREADY_REASSIGNED', 'Ticket has been already reassigned');
define(exports.responseMessages, 'INVALID_CLONE_TICKET', 'Invalid Clone Ticket id');
define(exports.responseMessages, 'INVALID_TICKET_ID', 'Invalid Ticket id');
define(exports.responseMessages, 'INVALID_TICKET_REASSIGNMENT', 'This ticket cant be reassigned');
define(exports.responseMessages, 'NO_BID_ZONE_ASSOCIATED_WITH_MARKET', 'No bid zone associated with this market');
define(exports.responseMessages, 'PROGRAM_LEVEL_TABLES_ALREADY_EXIST', 'Program level tables already exists');
define(exports.responseMessages, 'SITES_VALIDATED', 'Sites are validated successfully, click on Upload Sites button to add them');
define(exports.responseMessages, 'INVALID_PRICE_FOR_ITEM', `Invalid price, some of the ${i18n.__('vendors')} have amount greater than max amount.`);
define(exports.responseMessages, 'RESET_PASSWORD_LINK_EXPIRED', 'The Password Reset Link Has Expired');
define(exports.responseMessages, 'RESOURCE_UNAVAILABLE', 'The resource you requested is not available or you do not have permissions. ');
define(exports.responseMessages, 'VENDOR_PRICE_EXCEED', `${i18n.__('vendors')} price can not be greater than max price.`);
define(exports.responseMessages, 'VENDOR_EXISTS', `${i18n.__('vendor')} already exists.`);
define(exports.responseMessages, 'SERVICE_CATEGORY_ALREADY_EXIST', 'Service Category already exist');
define(exports.responseMessages, 'SERVICE_CATEGORY_NOT_FOUND', 'Service Category not found');
define(exports.responseMessages, 'DUPLICATE_IMN_NUMBER', 'Duplicate value for Item Master Number');
define(exports.responseMessages, 'HANDLER_ERROR', 'Error in controller handler');
define(exports.responseMessages, 'SITE_CAN_NOT_DELETED', '<%VALUE%> site(s) can not be deactivated/deleted. Some active projects are associated with them');
define(exports.responseMessages, 'SITE_PROGRAM_CAN_NOT_DEACTIVATED', "Site at program Level Cannot be activated when it's deactivated at Admin level");
define(exports.responseMessages, 'BID_ZONE_CAN_NOT_DELETED', 'This bidzone could not be deactivated, because project on some of the sites under this bidzone exists');
define(exports.responseMessages, 'BID_ZONE_CAN_NOT_DELETED_MULTIPLE', 'These bidzones could not be deactivated, because project on some of the sites under these bidzones exists');
define(exports.responseMessages, 'TICKET_CAN_NOT_BE_CREATED', 'Ticket could not be created');
define(exports.responseMessages, 'PAST_DATE_NOT_ALLOWED','Cannot create contract for past date time.');
define(exports.responseMessages, 'SERVICE_CATEGORY_DEPENDENCY',  'Cannot Delete Service Category: Dependencies Exist');
define(exports.responseMessages, 'SITE_PROJECT_DEPENDENCY',  'Cannot deactivate Site, project on this site exists');
define(exports.responseMessages, 'BID_ZONE_PROJECT_DEPENDENCY',  'This bidzone could not be deleted, because project on some of the sites under this bidzone exists');
define(exports.responseMessages, 'BID_ZONE_PROJECT_DEPENDENCY_MULTIPLE',  'These bidzones could not be deleted, because project on some of the sites under these bidzones exists');
define(exports.responseMessages, 'BID_EVENT_NOT_FOUND', 'Bid event not found');
define(exports.responseMessages, 'CONTRACTS_NOT_FOUND', 'Contracts not found');
define(exports.responseMessages, 'CANNOT_EDIT_TICKET_ITEMS', 'Bid event is no longer in review period');
define(exports.responseMessages, 'CANNOT_EDIT_BID_EVENT', 'Bid event is no longer in unpublished, open or review period');
define(exports.responseMessages, 'BID_NOT_FOUND', 'No bid found for this bid event');
define(exports.responseMessages, 'BID_EVENT_LOT_NOT_FOUND', `Could not find any lots for this Bid Event. Please refresh and try again`);
define(exports.responseMessages, 'BID_EVENT_LOT_TICKET_NOT_FOUND', `Could not find any tickets for this lot. Please refresh and try again`);
define(exports.responseMessages, 'BID_EVENT_TICKET_ITEM_NOT_FOUND', `Could not find any items for this ticket. Please refresh and try again`);
define(exports.responseMessages, 'VENDOR_CONTACT_INFO_MISSING', `Please submit contact number and name`);
define(exports.responseMessages, 'INVALID_OBJECT_ID', `Invalid ID provided`);
define(exports.responseMessages, 'ITEM_PRICE_NOT_AVAILABLE', `Item Price of some of the items is not available`);
define(exports.responseMessages, 'ITEM_CATALOG_PRICE_CHANGED', `Item Price of some of the items has changed. Please refresh and try again`);
define(exports.responseMessages, 'DUPLICATE_GENERAL_ITEM', 'Duplicate general item');
define(exports.responseMessages, 'UNKNOWN_GENERAL_ITEM', 'Unknown general item');
define(exports.responseMessages, 'CANNOT_DELETE_GENERAL_ITEM', `Cannot delete ${i18n.__('company')} added general item`);
define(exports.responseMessages, 'CANNOT_ADD_GENERAL_ITEM', 'Cannot add general item for this contract');
define(exports.responseMessages, 'CANNOT_EDIT_GENERAL_ITEM', 'Cannot edit general item of this contract');
define(exports.responseMessages, 'BID_REQUIRED', `Please fill bid price for all lots`);
define(exports.responseMessages, 'BID_REQUIRED_TICKETS', 'Please fill bid price for all tickets');
define(exports.responseMessages, 'BID_REQUIRED_ITEMS', 'Please fill bid price for all ticket items');
define(exports.responseMessages, 'NO_GENERAL_ITEMS_FOUND', 'No general Items Found');
define(exports.responseMessages, 'PARSING_ERROR', 'Something went wrong in parsing! Invalid or Corrupt file.');
define(exports.responseMessages, 'INVALID_EXCEL', 'File is invalid');
define(exports.responseMessages, 'INVALID_PDF', 'File is invalid');
define(exports.responseMessages, 'TICKET_ID_REQUIRED', 'Ticket id required');
define(exports.responseMessages, 'NO_VENDOR_FOUND', `No ${i18n.__('vendor')} found`);
define(exports.responseMessages, 'BID_STATUS_UPDATE_NOT_ALLOWED', 'Bid event is no longer in paused, live or past period');
define(exports.responseMessages, 'BID_CANCELLATION_NOT_ALLOWED', 'Cannot cancel a bid event in past period');
define(exports.responseMessages, 'CANNOT_POST_BID', 'Cannot post bid. Bid Event no longer in open or live period');
define(exports.responseMessages, 'CANNOT_EDIT_QA_BID', 'Cannot change bid Q&A except in Draft or Dive period.');
define(exports.responseMessages, 'MAX_REBID_COUNT_REACHED', `You have reached you're max bid count`);
define(exports.responseMessages, 'MINIMUM_DECREMENT_PERCENTAGE_VIOLATED', `Minimum decrement % is X, please ensure that this proposed bid is less by at least X % compared to the previous one.`);
define(exports.responseMessages, 'BID_GREATER_THAN_CATALOG_PRICE', `Oops, you posted a bid greater than the ${i18n.__('catalog')} price`);
define(exports.responseMessages, 'BID_GREATER_THAN_POSTED_BID_PRICE', `Oops, you posted a bid greater than the posted bid price`);
define(exports.responseMessages, 'BID_ASSIGNED_TO_SAME_VENDOR', `You have already assigned the bid to this vendor`);
define(exports.responseMessages, 'BID_ASSIGNMENT_NOT_ALLOWED', `You can't assign this bid event`);
define(exports.responseMessages, 'BID_VENDOR_ASSIGNMENT_NOT_ALLOWED', `You can't assign this bid event to a non-participating vendor`);
define(exports.responseMessages, 'BID_VENDOR_ACCEPTANCE_NOT_ALLOWED', `Oops, this bid event is no longer assigned to you`);
define(exports.responseMessages, 'BID_NOT_FOUND_TICKET', `Oops, the selected vendor has not posted bid for all tickets`);
define(exports.responseMessages, 'ERROR_IN_CREATING_JOBS', `Some error occurred while creating jobs for all tickets`);
define(exports.responseMessages, 'TICKET_ITEMS_NOT_FOUND', `Could not find any items for some ticket`);
define(exports.responseMessages, 'TICKET_ASSIGNMENT_NOT_ALLOWED', `Can't assign ticket which are in bidding event`);
define(exports.responseMessages, 'BID_RESET_NOT_ALLOWED', `Oops, you can't reset bids as this bid event is no longer in live period.`);
define(exports.responseMessages, 'NO_COMPANY_USER', `User does not have the privileges to access the ${i18n.__('company')} portal.`);
define(exports.responseMessages, 'NO_VENDOR_USER', `User does not have the privileges to access the ${i18n.__('vendor')} portal.`);
define(exports.responseMessages, 'USER_REGISTERED_AS_COMPANY', `User already exists as a ${i18n.__('company')}. Please register as a new user.`);
define(exports.responseMessages, 'USER_REGISTERED_AS_VENDOR', `User already exists as a ${i18n.__('vendor')}. Please register as a new user.`);
define(exports.responseMessages, 'MINIMUM_VENDOR_COUNT_FOR_BID_EVENT', `Minimum number of ${i18n.__('vendor')} applicable to create an event are X`);
define(exports.responseMessages, 'INVALID_INVOICE_GENERATION', `Get PO approval before generating invoice`);
define(exports.responseMessages, 'HEADINGS_ROWS_CORRUPT', 'Headings and rows data is corrupt');

define(exports.responseMessages, 'INVALID_AVETTAID', 'Avetta id already exist.');
define(exports.responseMessages, 'INVALID_COMPANYID', `${i18n.__('company')} id already exist.`);
define(exports.responseMessages, 'AGREEMENT_DOC_MISSING', `End User License Agreement is Invalid`);
define(exports.responseMessages, 'AGREEMENT_NOT_ACCEPTED', `Kindly accept End User License Agreement.`);
define(exports.responseMessages, 'DEVICE_TYPE_INVALID', 'Device type is invalid');
define(exports.responseMessages, 'CONTRACT_NOT_FOUND', 'Contract not found');
define(exports.responseMessages, 'MILESTONE_USED_AS_PRE_REQUISITE', `Cannot select other template. This template's milestone(s) is/are added as a prerequisites in some other milestone.`);
define(exports.responseMessages, 'MILESTONE_USED_IN_CALCULATION', `Cannot select other template. This template's milestone(s) is/are being used by another milestone for its calculation.`);
define(exports.responseMessages, 'UNDER_REVIEW', 'Your profile is under review.<br> Please contact the administrator for further updates.');
define(exports.responseMessages, 'USER_APPROVED', 'Your account profile has been approved.');
define(exports.responseMessages, 'USER_REJECTED', 'Your account approval has been rejected.<br> Please contact the administrator for the reason.');
define(exports.responseMessages, 'USER_BLOCKED', 'Administrator has blocked your account access. Please contact the administrator.');
define(exports.responseMessages, 'USER_DELETED', 'Your account has been deleted by Scopeworker administrator. Please contact the administrator.');
define(exports.responseMessages, 'SCHEDULE_DATE_IN_PAST', 'Schedule date is already passed for {{{tickets}}}.');
define(exports.responseMessages, 'USER_AT_SAME_STATUS', 'User is currently in same status.');
define(exports.responseMessages, 'BAD_REQUEST', 'Bad Request');
define(exports.responseMessages, 'MILESTONE_TEMPLATE_ALREADY_USED_IN_PROJECT', 'This milestone template already used in this project');

define(exports.responseMessages, 'INVALID_SECRET_KEY', `Can't use internal without secret key`);
define(exports.responseMessages, 'MILESTONES_NOT_EXIST', '<%VALUE%> milestone(s) does not exist');
define(exports.responseMessages, 'MILESTONE_REQUIRED', 'Atleast one milestone is required');
define(exports.responseMessages, 'DRIVER_ALREADY_ASSIGNED', `This ride already assigned to another driver`);
define(exports.responseMessages, 'TICKET_ALREADY_ACCEPTED_REJECTED', 'Ticket has been already accepted/rejected, please refresh your page to see the changes.');
define(exports.responseMessages, 'INVALID_CHANGE_ORDER_REQUEST', 'Change Order details have been updated, please refresh your page to see the changes.');
define(exports.responseMessages, 'BID_ALREADY_ACCEPTED_REJECTED', `Oops, this bid event is no longer available for acceptance`);
define(exports.responseMessages, 'INVALID_TEAM_ID', 'The selected team is no longer available.');
define(exports.responseMessages, 'FORMULA_CIRCULAR_DEPENDENCY_FOUND', 'Milestone formula cannot have circular dependencies.');
define(exports.responseMessages, 'INVALID_BULK_NOTIFICATION_DELETE', 'The selected users cannot be removed as there should be atleast one user in the bidzone.');
define(exports.responseMessages, 'SAME_BID_NOT_ALLOWED', `Same bid not allowed, please post a different bid compared to the previous one.`);
define(exports.responseMessages, 'MILESTONES_CONFIGURED', 'Milestone(s) configured');

define(exports.responseMessages, 'COMPANY_FLAG_ALREADY_SET', `${i18n.__('company')} Flag is already set`);
define(exports.responseMessages, 'NO_DRAFT_FOUND', `No document found in draft stage`);
define(exports.responseMessages, 'NO_DOCS_FOUND', 'No documents found in published stage.');

define(exports.responseMessages, 'INVALID_COMPLETED_JOB_STATUS_CHANGE', `Ticket status can't be changed for Completed/Failed task.`);
define(exports.responseMessages, 'INVALID_SAME_JOB_STATUS_CHANGE', `Ticket status is already the selected type.`);
define(exports.responseMessages, 'INVALID_SUB_VENDOR_DELETION', `Contracts are assigned to this user, please re-assign these Contracts and try again.`);

define(exports.responseMessages, 'BID_EVENT_ACCESS', 'BID number bid_number has been added to your dashboard.');
define(exports.responseMessages, 'MULTIPLE_INVALID_BID_EVENT_ACCESS', 'BID number bid_number has been removed from your dashboard.');
define(exports.responseMessages, 'INVALID_BID_EVENT_ACCESS', 'A new contract has been added on which you do not have the permissions so BID number bid_number has been removed from your dashboard.');
define(exports.responseMessages, 'INVALID_PROJECT_BID_EVENT_ACCESS', 'This bid event contains a contract on which you do not have the permissions so BID number bid_number has been removed from your dashboard.');
define(exports.responseMessages, 'DUPLIICATE_SITE', 'Site Already Exists');

define(exports.responseMessages, 'INVALID_CHANGE_ORDER_ACTION', 'Change order condition has been changed, please refresh the page.');

define(exports.responseMessages, 'TICKET_NOT_ASSIGNED', 'Ticket is no longer assigned to you, please refresh your page to see the changes.');

define(exports.responseMessages, 'GENERIC_MILESTONE_ALREADY_ADDED', 'This generic milestone is already added in the <%VALUE%>');
define(exports.responseMessages, 'PROJECT_GENERIC_MILESTONE_NOT_FOUND', 'Project generic milestone not found');
define(exports.responseMessages, 'CONTRACT_GENERIC_MILESTONE_NOT_FOUND', 'Contract generic milestone not found');
define(exports.responseMessages, 'CAN_NOT_DELETE_TEMPLATE', `Can not delete this template. This template's milestone(s) is/are being used as Prerequisite or in Formula by another milestones.`);
define(exports.responseMessages, 'INVALID_DATE', `Invalid <%VALUE%> date provided`);
define(exports.responseMessages, 'MILESTONE_DEPENDENCY_FOUND', `This date is being used in following milestones and thus cannot be turned off. Please make the below milestones independent of this date in order to deactivate this date.`);
define(exports.responseMessages, 'MILESTONE_DEPENDENCY_FOUND_DELETE', `This milestone is used as Prerequisite or in Formula for following milestones. Please remove them from their Prerequisite or Formula before trying to delete again.`);
define(exports.responseMessages, 'MILESTONE_TEMPLATE_NOT_EXIST', `Milestone template does not exist`);
define(exports.responseMessages, 'GENERIC_MILESTONE_NOT_FOUND', `Generic milestone not found`);


define(exports.responseMessages, 'CONTRACT_TEMPLATE_MILESTONE_NOT_FOUND', `Contract Template milestone not found`);
define(exports.responseMessages, 'GENERIC_MILESTONE_NOT_FOUND', 'Generic milestone not found');
define(exports.responseMessages, 'DUPLICATE_GENERIC_MILESTONE', 'Duplicate Generic milestone');
define(exports.responseMessages, 'SELF_DEPENDENCY', 'Milestone cannot be its own pre requisite');
define(exports.responseMessages, 'TICKET_MILESTONE_NOT_FOUND', 'No ticket milestone found');
define(exports.responseMessages, 'MAX_OPERAND_LIMIT_EXCEED', 'You can select maximum 10 operands');

define(exports.responseMessages, 'INVALID_GRANT_ERROR', 'Invalid grant: user credentials are invalid');
define(exports.responseMessages, 'MILESTONE_INVALID_DATE_PICKER_DATE', 'This milestone has %milestones% as the pre-requisite/s. Thus this milestone cannot have a date which is before to that of pre-requisite milestone date.');
define(exports.responseMessages, 'MILESTONE_DATE_PICKER_DATE_NOT_ALLOWED', 'This milestone has %milestones% as the pre-requisite/s whose date/s are not available. Thus this milestone cannot have a date.');
define(exports.responseMessages, 'NULLDEVICETOKEN', 'Device token is null');
define(exports.responseMessages, 'SERVERDOESNOTSUPPORT',"Server does not support for sending notification")
define(exports.responseMessages, 'NOTIFICATIONSEND', 'Notification send successfully');
define(exports.responseMessages,'CANCELNOTIFICATION', "Cancel notification send successfully")
// FOR FLAGS
define(exports.responseFlags, 'INVALID_AVETTAID', 201);
define(exports.responseFlags, 'INVALID_COMPANYID', 201);
define(exports.responseFlags, 'KATO_LOGIN_ACCESS_TOKEN_SUCCESS', 200);
define(exports.responseFlags, 'INVALID_CSV', 201);
define(exports.responseFlags, 'PARAMETER_MISSING', 100);
define(exports.responseFlags, 'INCORRECT_PARAMETER', 400);
define(exports.responseFlags, 'INVALID_ACCESS_TOKEN', 405); //TO DO:  To replace it to 401 and adjust apps to properly manage as an Unauthorize HTTP response
define(exports.responseFlags, 'INVALID_USER_TYPE', 400);
define(exports.responseFlags, 'INACTIVE_ACCOUNT', 101);
define(exports.responseFlags, 'ACCOUNT_DELETED_ERROR', 101);
define(exports.responseFlags, 'SAME_PASSWORD_ERROR', 101);
define(exports.responseFlags, 'INCORRECT_PASSWORD', 101);
define(exports.responseFlags, 'INVALID_RESET_PASSWORD_LINK', 101);
define(exports.responseFlags, 'INVALID_USERNAME', 201);
define(exports.responseFlags, 'INVALID_EMAIL_ID', 201);
define(exports.responseFlags, 'WRONG_PASSWORD', 201);
define(exports.responseFlags, 'ACTION_COMPLETE', 200);
define(exports.responseFlags, 'LOGIN_SUCCESSFULLY', 200);
define(exports.responseFlags, 'SHOW_ERROR_MESSAGE', 201);
define(exports.responseFlags, 'REGISTRATION_SUCCESSFUL', 201);
define(exports.responseFlags, 'IMAGE_FILE_MISSING', 102);
define(exports.responseFlags, 'DATA_NOT_FOUND', 404);
define(exports.responseFlags, 'ERROR_IN_EXECUTION', 404);
define(exports.responseFlags, 'UPLOAD_ERROR', 201);
define(exports.responseFlags, 'USER_NOT_FOUND', 201);
define(exports.responseFlags, 'PASSWORD_CHANGED_SUCCESSFULLY', 200);
define(exports.responseFlags, 'EXCEED_FLEET_COUNT', 202);
define(exports.responseFlags, 'ACCOUNT_EXPIRE', 401);
define(exports.responseFlags, 'SHOW_WARNING', 410);
define(exports.responseFlags, 'ACTION_COMPLETE_2', 205);
define(exports.responseFlags, 'BILLING_PLAN_CHANGED_FOR_TODAY', 206);
define(exports.responseFlags, 'CREDIT_CARD_NOT_ADDED', 300);
define(exports.responseFlags, 'VENDOR_NOT_FOUND', 201);
define(exports.responseFlags, 'VENDOR_NOT_FOUND', 400);
define(exports.responseFlags, 'EMAIL_ALREADY_EXISTS', 400);
define(exports.responseFlags, 'DOMAIN_NOT_AVAILABLE', 400);
define(exports.responseFlags, 'DOMAIN_NOT_CREATED', 400);
define(exports.responseFlags, 'DOMAIN_NOT_FOUND', 400);
define(exports.responseFlags, 'FORM_SETTINGS_NOT_FOUND', 400);
define(exports.responseFlags, 'ALREADY_EXIST', 400);
define(exports.responseFlags, 'SMS_SETTINGS_NOT_FOUND', 400);
define(exports.responseFlags, 'JOB_NOT_MAPPED_WITH_YOU', 501);
define(exports.responseFlags, 'INVALID_EMAIL_PASSWORD', 401);
define(exports.responseFlags, 'SUCCESS_LOGIN', 200);
define(exports.responseFlags, 'HELP_MODE_RAISED', 200);
define(exports.responseFlags, 'VIDEO_NOTIFICATION', 200);
define(exports.responseFlags, 'VIDEO_NOTIFICATION_CLOSED', 200);
define(exports.responseFlags, 'PLANT_VALIDATION_FAILED', 400);
define(exports.responseFlags, 'CATALOG_ALREADY_EXIST', 400);
define(exports.responseFlags, 'CATALOG_NOT_FOUND', 400);
define(exports.responseFlags, 'ITEM_ALREADY_EXIST', 400);
define(exports.responseFlags, 'ITEM_NOT_FOUND', 400);
define(exports.responseFlags, 'NO_UNIT_FOUND', 400);
define(exports.responseFlags, 'INVALID_BID_ZONE', 400);
define(exports.responseFlags, 'VARIATION_NOT_FOUND', 400);
define(exports.responseFlags, 'PURCHASE_ORDER_ALREADY_EXIST', 400);
define(exports.responseFlags, 'PURCHASE_ORDER_NOT_FOUND', 400);
define(exports.responseFlags, 'SITE_NOT_FOUND', 400);
define(exports.responseFlags, 'CATEGORY_NOT_FOUND', 400);
define(exports.responseFlags, 'SUB_CATEGORY_NOT_FOUND', 400);
define(exports.responseFlags, 'GENERAL_ITEM_FOUND', 400);
define(exports.responseFlags, 'CATEGORY_ALREADY_EXIST', 400);
define(exports.responseFlags, 'NO_VENDOR', 400);
define(exports.responseFlags, 'UPDATE_SUCCESS', 200);
define(exports.responseFlags, 'BIDZONE_ALREADY_EXIST', 400);
define(exports.responseFlags, 'NOT_FOUND', 400);
define(exports.responseFlags, 'MOVEMENT_FLEET_NOT_FOUND', 400);
define(exports.responseFlags, 'ERROR_MESSAGE', 400);
define(exports.responseFlags, 'INVALID_ACCESS_TOKEN_FOR_PROGRAM', 406);
define(exports.responseFlags, 'INVALID_ACCESS', 403);
define(exports.responseFlags, 'CONTACT_EMAIL_ALREADY_EXIST', 411);
define(exports.responseFlags, 'CONTACT_PHONE_ALREADY_EXIST', 412);
define(exports.responseFlags, 'PROGRAM_LEVEL_TABLES_ALREADY_EXIST', 200);
define(exports.responseFlags, 'SERVICE_CATEGORY_ALREADY_EXIST',  400);
define(exports.responseFlags, 'SERVICE_CATEGORY_NOT_FOUND',  400);
define(exports.responseFlags, 'DUPLICATE_IMN_NUMBER',  400);
define(exports.responseFlags, 'SERVICE_CATEGORY_DEPENDENCY',  400);
define(exports.responseFlags, 'HANDLER_ERROR',  400);
define(exports.responseFlags, 'TICKET_ID_REQUIRED',  400);
define(exports.responseFlags, 'NO_VENDOR_FOUND',  400);
define(exports.responseFlags, 'AGREEMENT_NOT_ACCEPTED', 428);   //
define(exports.responseFlags, 'PROFILE_APPROVAL_ERROR', 429);
define(exports.responseFlags, 'AGREEMENT_DOC_MISSING', 400);
define(exports.responseFlags, 'BAD_REQUEST', 400);
define(exports.responseFlags, 'DEVICE_TYPE_INVALID', 400);
define(exports.responseFlags, 'TEMP_REDIRECT', 307);




define(exports.responseFlags, 'COMPANY_FLAG_ALREADY_SET', 400);
define(exports.responseFlags, 'NO_DRAFT_FOUND', 400);
define(exports.responseFlags, 'NO_DOCS_FOUND', 329);
define(exports.responseFlags, 'INVALID_TRACKINGORDER', 201);
define(exports.responseFlags, 'NULLDEVICETOKEN', 201);
define(exports.responseFlags, 'SERVERDOESNOTSUPPORT', 500);
define(exports.responseFlags, 'NOTIFICATIONSEND', 200);



exports.notificationFlags = {};
define(exports.notificationFlags, 'RIDE_ASSIGN', 1);
define(exports.notificationFlags, 'RIDE_ACCEPT', 2);
define(exports.notificationFlags, 'RIDE_START', 3);
define(exports.notificationFlags, 'RIDE_CANCEL', 4);
define(exports.notificationFlags, 'RIDE_COMPLETE', 5);
define(exports.notificationFlags, 'NO_DRIVER_FOUND', 6);


exports.webhook_notification_types = {};
define(exports.webhook_notification_types, 'MASTER_FILE', 0);
define(exports.webhook_notification_types);

exports.userFreeStatus = {};
define(exports.userFreeStatus, 'FREE', 0);
define(exports.userFreeStatus, 'BUSY', 1);

exports.userDeleteStatus = {};
define(exports.userDeleteStatus, 'NO', 0);
define(exports.userDeleteStatus, 'YES', 1);

exports.userBlockedStatus = {};
define(exports.userBlockedStatus, 'NO', 0);
define(exports.userBlockedStatus, 'YES', 1);


exports.notificationStatus = {};
define(exports.notificationStatus, 'VIEWED', 1);
define(exports.notificationStatus, 'NOT_VIEWED', 0);

exports.userVerificationStatus = {};
define(exports.userVerificationStatus, 'VERIFY', 1);
define(exports.userVerificationStatus, 'NOT_VERIFY', 0);

exports.deviceType = {};
define(exports.deviceType, 'ANDROID', 0);
define(exports.deviceType, 'iOS', 1);

exports.isDispatcherStatus = {};
define(exports.isDispatcherStatus, 'YES', 1);
define(exports.isDispatcherStatus, 'NO', 0);
define(exports.isDispatcherStatus, 'LIMITED_VENDOR', 2);

exports.hasPermissionStatus = {};
define(exports.hasPermissionStatus, 'YES', 1);
define(exports.hasPermissionStatus, 'NO', 0);

exports.taskCreatedBy = {};
define(exports.taskCreatedBy, 'USER', 0);
define(exports.taskCreatedBy, 'DISPATCHER', 1);
define(exports.taskCreatedBy, 'FLEET', 2);
define(exports.taskCreatedBy, 'VENDOR', 3);

// exports.jobStatus = {};
// define(exports.jobStatus, 'UPCOMING', 0);
// define(exports.jobStatus, 'STARTED', 1);
// define(exports.jobStatus, 'ENDED', 2);
// define(exports.jobStatus, 'FAILED', 3);
// define(exports.jobStatus, 'ARRIVED', 4);
// define(exports.jobStatus, 'PARTIAL', 5);
// define(exports.jobStatus, 'UNASSIGNED', 6);
// define(exports.jobStatus, 'ACCEPTED', 7);
// define(exports.jobStatus, 'DECLINE', 8);
// define(exports.jobStatus, 'CANCEL', 9);
// define(exports.jobStatus, 'DELETED', 10);
// define(exports.jobStatus, 'IGNORED', 11);
// define(exports.jobStatus, 'InTransitBillable', 12);
// define(exports.jobStatus, 'InTransitNonBillable', 13);
// define(exports.jobStatus, 'WorkingOnSite', 14);
// define(exports.jobStatus, 'OnHold', 15);
// define(exports.jobStatus, 'NTEApproval', 16);
// define(exports.jobStatus, 'ContinueWork', 17);
// define(exports.jobStatus, 'NTEApproved', 18);
// define(exports.jobStatus, 'NTERejected', 19);
// define(exports.jobStatus, 'EndOfDay', 20);
// define(exports.jobStatus, 'CANCELLED', 21);
// define(exports.jobStatus, 'REASSIGNED', 22);
// define(exports.jobStatus, 'ENDED_BY_VENDOR', 24);


exports.jobStatus = {};
define(exports.jobStatus, 'UNASSIGNED', 0);
define(exports.jobStatus, 'ASSIGNED', 1);
define(exports.jobStatus, 'STARTED', 2);
define(exports.jobStatus, 'ENDED', 3);
define(exports.jobStatus, 'CANCELLED', 4);
define(exports.jobStatus, 'FAILED', 5);

exports.paymentStatus={};
define(exports.paymentStatus,'COMPLETE','completed');

exports.paymentType={};
define(exports.paymentType,'CASH','cash');
define(exports.paymentType,'ONLINE','credit-card');

exports.jobStatusColor = {};
define(exports.jobStatusColor, 0, '#FF0000'); //   color-red  status-UPCOMING
define(exports.jobStatusColor, 1, '#ffaa0a'); //   color-dark orange  status-STARTED
define(exports.jobStatusColor, 2, '#16c31e'); //   color- parrot green  status-ENDED
define(exports.jobStatusColor, 3, '#5c31ff'); //   color- dark blue  status-FAILED
define(exports.jobStatusColor, 4, '#4fffe6'); //   status-ARRIVED
define(exports.jobStatusColor, 5, '#ffb61e'); //   status-PARTIAL
define(exports.jobStatusColor, 6, '#fbff65'); //   status-UNASSIGNED
define(exports.jobStatusColor, 7, '#0fff7e'); //   status-ACCEPTED
define(exports.jobStatusColor, 8, '#5fe6ff'); //   status-DECLINE
define(exports.jobStatusColor, 9, '#ff2209'); //   color-dark red  status-CANCEL
define(exports.jobStatusColor, 10, '#ff2b96'); //  status-'DELETED'
define(exports.jobStatusColor, 11, '#383bff'); //  status-IGNORED
define(exports.jobStatusColor, 12, '#493eff'); //  color-dark blue  status-InTransitBillable
define(exports.jobStatusColor, 13, '#ff2455'); //  color-dark red  status-InTransitNonBillable
define(exports.jobStatusColor, 14, '#918bff'); //  color-voilet   status-WorkingOnSite
define(exports.jobStatusColor, 15, '#2db23f'); //  color-parrot green   status-OnHold
define(exports.jobStatusColor, 16, '#ffca25'); //  status-NTEApproval
define(exports.jobStatusColor, 17, '#ff1dac'); //  status-ContinueWork
define(exports.jobStatusColor, 18, '#61ff4d'); //  status-NTEApproved
define(exports.jobStatusColor, 19, '#ffb6f4'); //  status-NTERejected
define(exports.jobStatusColor, 20, '#ff6341'); //  status-EndOfDay
define(exports.jobStatusColor, 21, '#62ffc6'); //  status-CANCELLED
define(exports.jobStatusColor, 22, '#7aff42'); //  status-REASSIGNED

exports.jobStatusValue = {
    0: 'Assigned',
    1: 'Started',
    2: 'Completed by Agent',
    3: 'Failed',
    4: 'In Progress',
    5: 'Partial',
    6: 'Unassigned',
    7: 'Accepted',
    8: 'Decline',
    9: 'Cancel',
    10: 'Deleted',
    11: 'Ignored',
    12: 'InTransit Billable',
    13: 'InTransit Non-Billable',
    14: 'Working on Site',
    15: 'On Hold',
    16: 'NTE Approval',
    17: 'Continue Work',
    18: 'NTE Approved',
    19: 'NTE Rejected',
    20: 'End Of Day',
    21: 'Cancelled',
    22: 'Reassigned',
    23: '',
    24: `Completed by ${i18n.__('vendor')}`
};
exports.documentType = {};
define(exports.documentType, 'EXCEL', 1);
define(exports.documentType, 'PDF', 0);

// if(config.get('service_category_required')) {
    exports.lineItemStatusValue = {
        0: `Provisional PR pending ${i18n.__('client')} approval`,
        1: `Provisional PR pending ${i18n.__('company_name')} PO`,
        2: `Provisional PR Rejected by ${i18n.__('client')}`,
        3: `Deleted`,
        4: `Provisional PR pending ${i18n.__('vendor')} approval`,
        5: `Provisional PR Rejected by ${i18n.__('vendor')}`,
        6: `Provisional PR Approved by ${i18n.__('vendor')}`,
        7: `Provisional PR Cancelled by ${i18n.__('client')}`,
        8: `Provisional PR Approved by ${i18n.__('client')}`,
        9: `Provisional PR Cancelled by ${i18n.__('vendor')}`,
        10: `Ready to Generate Invoice`,
        /*    10: 'Invoice Pending Approval',
            11: 'Invoice Approved by Client',
            12: 'Invoice Cancelled by Vendor',
            13: 'Invoice Rejected by Client',*/
        14: '-',
   };
// }else {
//     exports.lineItemStatusValue = {
//         0: `POR Pending ${i18n.__('client')} Approval`,
//         1: `PO Issued`,
//         2: `POR Rejected by ${i18n.__('client')}`,
//         3: `Deleted`,
//         4: `POR Pending ${i18n.__('vendor')} Approval`,
//         5: `POR Rejected by ${i18n.__('vendor')}`,
//         6: `POR Approved by ${i18n.__('vendor')}`,
//         7: `POR Cancelled by ${i18n.__('client')}`,
//         8: `POR Approved by ${i18n.__('client')}`,
//         9: `POR Cancelled by ${i18n.__('vendor')}`,
//         10: 'Invoice Pending Approval',
//         11: `Invoice Approved by ${i18n.__('client')}`,
//         12: `Invoice Cancelled by ${i18n.__('vendor')}`,
//         13: `Invoice Rejected by ${i18n.__('client')}`,
//         14: '-',
//     };
// }


// if(config.get('service_category_required')) {
    exports.previousActionValue = {
        0: `Provisional PR Rejected by ${i18n.__('client')}`,
        1: `Provisional PR Approved by ${i18n.__('client')}`,
        2: `Provisional PR Cancelled by ${i18n.__('client')}`,
        3: `Provisional PR Rejected by ${i18n.__('vendor')}`,
        4: `Provisional PR Approved by ${i18n.__('vendor')}`,
        5: `Provisional PR Cancelled by ${i18n.__('vendor')}`,
        6: `Invoice Approved by ${i18n.__('client')}`,
        7: `Invoice Cancelled by ${i18n.__('vendor')}`,
        8: `Invoice Rejected by ${i18n.__('client')}`,
        9: `Ticket Accepted by ${i18n.__('vendor')}`,
        10: `Provisional PR pending ${i18n.__('client')} approval`,    //'POR Pending Client Approval',
        11: `Provisional PR pending ${i18n.__('vendor')} approval`,     //'POR Pending Vendor Approval'
    };
// } else {
//     exports.previousActionValue = {
//         0: `POR Rejected by ${i18n.__('client')}`,
//         1: `POR Approved by ${i18n.__('client')}`,
//         2: `POR Cancelled by ${i18n.__('client')}`,
//         3: `POR Rejected by ${i18n.__('vendor')}`,
//         4: `POR Approved by ${i18n.__('vendor')}`,
//         5: `POR Cancelled by ${i18n.__('vendor')}`,
//         6: `Invoice Approved by ${i18n.__('client')}`,
//         7: `Invoice Cancelled by ${i18n.__('vendor')}`,
//         8: `Invoice Rejected by ${i18n.__('client')}`,
//         9: `Ticket Accepted by ${i18n.__('vendor')}`,
//         10: `POR Pending ${i18n.__('client')} Approval`,
//         11: `POR Pending ${i18n.__('vendor')} Approval`
//     };
// }

exports.lineItemStatuses = {
  POR_Pending_Client_Approval: 0,
  PO_Issued: 1,
  POR_Rejected_by_Client: 2,
  Deleted: 3,
  POR_Pending_Vendor_Approval: 4,
  POR_Rejected_by_Vendor: 5,
  POR_Approved_by_Vendor: 6,
  POR_Cancelled_by_Client: 7,
  POR_Approved_by_Client: 8,
  POR_Cancelled_by_Vendor: 9,
  Invoice_Pending_Approval: 10,
  Invoice_Approved_by_Client: 11,
  Invoice_Cancelled_by_Vendor: 12,
  Invoice_Rejected_by_Client: 13,
  '-': 14,
};

exports.APPROVAL_TYPE = {
  WORKFLOW: 'workflow',
  FINANCIAL: 'financial'
};

exports.FILENAME = {
  WORKFLOW: 'Workflow',
  FINANCIAL: 'Financial'
};

exports.SUBJECT = {
  EXPORT_SUBJECT: 'Approvals Exported Data'
};

exports.APPROVAL_OVERALL_STATUS = {
  PENDING: 'PENDING',
  APPROVED: 'APPROVED',
  REJECTED: 'REJECTED',
  ALL: 'ALL'
};

exports.SOCKET_EVENT_IN_APPROVALS = {
  VENDOR_CANCELLED: 'vendor_cancelled',
  CLIENT_APPROVAL: 'client_approval',
  COMPANY_CUSTOM_APPROVE: 'company_custom_approve',
  VENDOR_APPROVAL: 'vendor_approval',
  CLIENT_CANCELLED: 'client_cancelled',
  VENDOR_CUSTOM_APPROVE:'vendor_custom_approve',
  COMPANY_MULTIPLE_CUSTOM_APPROVAL: 'company_multiple_custom_approval',
  CLIENT_MULTIPLE_CHANGE_ORDER: 'client_multiple_change_order',
  VENDOR_MULTIPLE_CUSTOM_APPROVAL: 'vendor_multiple_custom_approval',
  VENDOR_MULTIPLE_CHANGE_ORDER: 'vendor_multiple_change_order'
};

// if(config.get('service_category_required')) {
    exports.currentBillingStatusValue = {
        0: `Provisional PR pending ${i18n.__('client')} approval`,    //'POR Pending Client Approval',
        1: `Provisional PR pending ${i18n.__('vendor')} approval`,    //'POR Pending Vendor Approval'
        2: `Provisional PR pending ${i18n.__('company_name')} PO`,          //'PO Issued',
        3: `Ready to Generate Invoice`,
        // 3: 'Invoice Pending Approval',
        // 4: 'Invoice Approved',
    };
// } else {
//     exports.currentBillingStatusValue = {
//         0: `POR Pending ${i18n.__('client')} approval`,
//         1: `POR Pending ${i18n.__('vendor')} approval`,
//         2: `PO Issued`,
//         3: `Invoice Pending Approval`,
//         4: `Invoice Approved`,
//     };
// }

exports.IBM_WATSON_IMAGE_FLAG_MESSAGES = {
    "RED": "Selected classifier has confidence score of below Y",
    "GREEN": "Selected classifier has confidence score of ≥ X",
    "ORANGE": "Selected classifier have the confidence score ≥ Y and < X"
};

exports.IBM_WATSON_IMAGE_FLAG = {
    "RED": 0,
    "GREEN": 1,
    "ORANGE": 2,
    "GRAY": 3,
};

exports.ibmWatsonThreshold = 0.0;
exports.ibmWatsonNotificationMessage = "IBM Watson have rejected few images in following custom field(s)";

exports.fleetBlockStatus = {};
define(exports.fleetBlockStatus, 'YES', 0);
define(exports.fleetBlockStatus, 'NO', 1);

exports.jobAcknowledged = {};
define(exports.jobAcknowledged, 'YES', 1);
define(exports.jobAcknowledged, 'NO', 0);

exports.hasFieldInput = {};
define(exports.hasFieldInput, 'YES', 1);
define(exports.hasFieldInput, 'NO', 0);

exports.ratingWindowStatus = {};
define(exports.ratingWindowStatus, 'YES', 1);
define(exports.ratingWindowStatus, 'NO', 0);
define(exports.ratingWindowStatus, 'DISABLE', 2);
define(exports.ratingWindowStatus, 'CANCEL', 3);

exports.isCusotmerRated = {};
define(exports.isCusotmerRated, 'YES', 1);
define(exports.isCusotmerRated, 'NO', 0);

exports.tax = {};
if(config.get('service_category_required')) {
    define(exports.tax, 'tax', 0);
} else {
    define(exports.tax, 'tax', 6.25);
}

exports.mark_up = 0.05;

exports.lineItemStatus = {};
define(exports.lineItemStatus, 'PENDING', 0);
define(exports.lineItemStatus, 'APPROVED', 1);
define(exports.lineItemStatus, 'REJECTED', 2);

exports.completedByAdmin = {};
define(exports.completedByAdmin, 'YES', 1);
define(exports.completedByAdmin, 'NO', 0);

exports.jobAcknowledgementStatus = {};
define(exports.jobAcknowledgementStatus, 'NO', 0);
define(exports.jobAcknowledgementStatus, 'SUCCESS', 1);
define(exports.jobAcknowledgementStatus, 'FAILED', 2);
define(exports.jobAcknowledgementStatus, 'PARTIAL', 3);

exports.noImageRegexUsers = [2253, 1, 336, 3031];

exports.jobType = {};
define(exports.jobType, 'PICKUP', 0);
define(exports.jobType, 'DELIVERY', 1);
define(exports.jobType, 'FOS', 2);
define(exports.jobType, 'APPOINTMENT', 3);

exports.layoutType = {};
define(exports.layoutType, 'PICKUP_AND_DELIVERY', 0);
define(exports.layoutType, 'APPOINTMENT', 1);
define(exports.layoutType, 'FOS', 2);

exports.layoutTypeValue = {
    0: 'PICKUP_AND_DELIVERY',
    1: 'APPOINTMENT',
    2: 'FOS',
};

exports.userActiveStatus = {};
define(exports.userActiveStatus, 'ACTIVE', 1);
define(exports.userActiveStatus, 'INACTIVE', 0);

exports.isFirstTimeLogin = {};
define(exports.isFirstTimeLogin, 'YES', 1);
define(exports.isFirstTimeLogin, 'NO', 0);
define(exports.isFirstTimeLogin, 'LAYOUT', 2);

exports.previewType = {};
define(exports.previewType, 'EMAIL', 1);
define(exports.previewType, 'SMS', 0);

exports.hasPickup = {};
define(exports.hasPickup, 'YES', 1);
define(exports.hasPickup, 'NO', 0);

exports.hasDelivery = {};
define(exports.hasDelivery, 'YES', 1);
define(exports.hasDelivery, 'NO', 0);

exports.availableStatus = {};
define(exports.availableStatus, 'AVAILABLE', 1);
define(exports.availableStatus, 'NOT_AVAILABLE', 0);


exports.EmailIds = {};
define(exports.EmailIds, 'SANJAY', 'sanjay@click-labs.com');
define(exports.EmailIds, 'ARSH', 'arsh@tookanapp.com');
define(exports.EmailIds, 'SUMEET', 'sumeet@clicklabs.in');

exports.travellingMode = {};
define(exports.travellingMode, 'DRIVING', 'driving');
define(exports.travellingMode, 'CYCLING', 'Bicycling');

exports.constraintType = {};
define(exports.constraintType, 'PICKUP_HARD', 1);
define(exports.constraintType, 'DELIVERY_HARD', 2);
define(exports.constraintType, 'PICKUP_AND_DELIVERY_HARD', 3);

exports.billingPlan = {};
define(exports.billingPlan, 'TRIAL', 0);
define(exports.billingPlan, 'FREE_LIMITED', 1);
define(exports.billingPlan, 'FLEET_BASED', 2);
define(exports.billingPlan, 'TASK_BASED', 3);
define(exports.billingPlan, 'BULK_FLEET', 4);
define(exports.billingPlan, 'BULK_TASK', 5);
define(exports.billingPlan, 'FLEET_EMI', 6);
define(exports.billingPlan, 'TASK_EMI', 7);

exports.billingPlanValue = {
    0: 'TRIAL',
    1: 'FREE_LIMITED',
    2: 'AGENT_BASED',
    3: 'TASK_BASED',
    4: 'BULK_FLEET',
    5: 'BULK_TASK',
    6: 'FLEET_EMI',
    7: 'TASK_EMI',
};

exports.bulkBillingPlan = [
    4,
    5,
    6,
    7,
];

exports.tbCustomField = function(data) {
    if (data == '') {
        return '-';
    }
    return module.exports.tbCustomFieldValue[parseInt(data)];
};

exports.tbCustomFieldValue = {
    0: '-',
    1: 'Completed',
    2: 'Canceled',
};

exports.reverseTransportType = { 1: 'Car', 2: 'Motor Cycle', 3: 'Bicycle', 4: 'Scooter', 5: 'Foot', 6: 'Truck' };

exports.taskHistoryType = {};
define(exports.taskHistoryType, 'STATE_CHANGED', 'state_changed');
define(exports.taskHistoryType, 'IMAGE_ADDED', 'image_added');
define(exports.taskHistoryType, 'BARCODE_ADDED', 'barcode_added');
define(exports.taskHistoryType, 'TEXT_ADDED', 'text_added');
define(exports.taskHistoryType, 'IMAGE_AND_TEXT_ADDED', 'image_and_text_added');
define(exports.taskHistoryType, 'IMAGE_DELETED', 'image_deleted');
define(exports.taskHistoryType, 'BARCODE_DELETED', 'barcode_deleted');
define(exports.taskHistoryType, 'TEXT_DELETED', 'text_deleted');
define(exports.taskHistoryType, 'SIGN_IMAGE_ADDED', 'signature_image_added');
define(exports.taskHistoryType, 'SIGN_IMAGE_UPDATED', 'signature_image_updated');
define(exports.taskHistoryType, 'IMAGE_UPDATE', 'image_updated');
define(exports.taskHistoryType, 'TEXT_UPDATE', 'text_updated');
define(exports.taskHistoryType, 'CUSTOM_FIELD', 'custom_field_updated');
define(exports.taskHistoryType, 'CUSTOM_FIELD_APPROVED', 'custom_field_approved');
define(exports.taskHistoryType, 'CUSTOM_FIELD_APPROVED_VENDOR', 'custom_field_approved_vendor');
define(exports.taskHistoryType, 'CUSTOM_FIELD_REJECTED_VENDOR', 'custom_field_rejected_vendor');
define(exports.taskHistoryType, 'CUSTOM_FIELD_REJECTED', 'custom_field_rejected');
define(exports.taskHistoryType, 'CUSTOM_FIELD_DELETED', 'custom_field_deleted');
define(exports.taskHistoryType, 'TB_CUSTOM_FIELD', 'tb_custom_field_updated');
define(exports.taskHistoryType, 'TASK_PUSH_NOTIFY', 'task_assignment');
define(exports.taskHistoryType, 'FAILED_REASON', 'failed_reason');
define(exports.taskHistoryType, 'CANCEL_REASON', 'cancel_reason');
define(exports.taskHistoryType, 'OFFLINE_SYNC', 'offline_sync');
define(exports.taskHistoryType, 'LINE_ITEMS_ADDED', 'line_items_added');
define(exports.taskHistoryType, 'INVOICE', 'invoice');
define(exports.taskHistoryType, 'GEOFENCE_IN', 'geofence_in');
define(exports.taskHistoryType, 'GEOFENCE_OUT', 'geofence_out');
define(exports.taskHistoryType, 'BILLING_STATE_CHANGED', 'billing_state_changed');
define(exports.taskHistoryType, 'BID_EVENT_UPDATED', 'bid_event_updated');

exports.reminderAccountExpiry = {};
define(exports.reminderAccountExpiry, 'FIRST', 15);
define(exports.reminderAccountExpiry, 'SECOND', 5);
define(exports.reminderAccountExpiry, 'THIRD', 1);
define(exports.reminderAccountExpiry, 'FORTH', 3);

exports.fleetStatusColor = { 0: { 0: '#999999', 1: '#63AE0C' }, 1: { 0: '#999999', 1: '#2196F3' } };

exports.setUpWizardStep = {};
define(exports.setUpWizardStep, 'FIRST', 1);
define(exports.setUpWizardStep, 'SECOND', 2);
define(exports.setUpWizardStep, 'THIRD', 3);
define(exports.setUpWizardStep, 'FORTH', 4);


exports.defaultOptionalValue = {};
define(exports.defaultOptionalValue, 'DEFAULT', [{
        label: 'accept',
        value: '1',
    },
    {
        label: 'notes',
        value: 1,
        required: 0,
    },
    {
        label: 'images',
        value: 0,
        required: 0,
    },
    {
        label: 'signature',
        value: 0,
        required: 0,
    },
    {
        label: 'arrived',
        value: 0,
    },
    {
        label: 'slider',
        value: 1,
    },
    {
        label: 'confirm',
        value: 0,
    },
    {
        label: 'fleet_notification',
        value: 0,
    },
    {
        label: 'masking',
        value: 0,
    },
    {
        label: 'cancel_btn',
        value: 1,
    },
    {
        label: 'failed_btn',
        value: 1,
    },
    {
        label: 'barcode',
        value: 0,
    },

]);

exports.broadcastType = {};
define(exports.broadcastType, 'ONE_BY_ONE', 1);
define(exports.broadcastType, 'SEND_TO_ALL', 2);
define(exports.broadcastType, 'SEND_BATCH_WISE', 3);
define(exports.broadcastType, 'ROBIN_ROUND', 4);
define(exports.broadcastType, 'NEAREST_AVAILABLE', 5);

exports.driverOnlineStatus={}
define(exports.driverOnlineStatus,'OFFLINE',0);
define(exports.driverOnlineStatus,'ONLINE',1);

exports.driverStatus={};
define(exports.driverStatus,'FREE',0);
define(exports.driverStatus,'BUSY',1);

exports.driverJobStatus={};
define(exports.driverJobStatus,'ASSIGN',0);
define(exports.driverJobStatus,'PICKUP',1);
define(exports.driverJobStatus,'DELIVER',2);

exports.shipmentType={};
define(exports.shipmentType,'DEPOT','depot');
define(exports.shipmentType,'DESTINATION','destination');

exports.driverLoginStatus={};
define(exports.driverLoginStatus,'ENABLED',1);

exports.userStatus={};
define(exports.userStatus,'user_type','user');

exports.autoAssign = {};
define(exports.autoAssign, 'YES', 1);
define(exports.autoAssign, 'NO', 0);
define(exports.autoAssign, 'NO_ONE_ACCEPTED', 2);

exports.addOn = {};
define(exports.addOn, 'ROUTING', 1);
define(exports.addOn, 'INVOICING', 2);
define(exports.addOn, 'FLEET_CREATE_TASK', 3);
define(exports.addOn, 'NUMBER_MASKING', 4);
define(exports.addOn, 'VENDOR_FORM', 5);
define(exports.addOn, 'CUSTOM_CSV', 6);
define(exports.addOn, 'EMAIL_PARSING', 7);
define(exports.addOn, 'MESSAGING', 8);
define(exports.addOn, 'APP_CACHING', 9);

exports.user_addon_extras = { 1: 'twilio', 2: 'plivo' };
exports.user_addon_extras_details = {
    TWILIO: 'TWILIO',
    PLIVO: 'PLIVO',
};
exports.user_addon_extras_details_reverse = {
    TWILIO: 1,
    PLIVO: 2,
};
exports.user_addon_masking = { 1: 'twilio', 2: 'plivo' };
exports.user_addon_masking_details = {
    TWILIO: 'TWILIO',
    PLIVO: 'PLIVO',
};
exports.user_addon_masking_details_reverse = {
    TWILIO: 1,
    PLIVO: 2,
};

exports.addOnCost = {};
define(exports.addOnCost, 'VENDOR_FORM', 14.99);


exports.emailParsingTypes = {};
define(exports.emailParsingTypes, 'GRUBHUB', 1);
define(exports.emailParsingTypes, 'TAKEAWAY_COM', 2);
define(exports.emailParsingTypes, 'JUST_EAT', 3);
define(exports.emailParsingTypes, 'EAT_24', 4);
define(exports.emailParsingTypes, 'EAT_NOW', 5);
define(exports.emailParsingTypes, 'HUNGRY_HOUSE', 6);
define(exports.emailParsingTypes, 'HR_24_ANY_FOOD', 7);
exports.emailParsingTypesReverse = {};
define(exports.emailParsingTypesReverse, 1, 'GRUBHUB');
define(exports.emailParsingTypesReverse, 2, 'TAKEAWAY.COM');
define(exports.emailParsingTypesReverse, 3, 'JUST_EAT');
define(exports.emailParsingTypesReverse, 4, 'EAT_24');
define(exports.emailParsingTypesReverse, 5, 'EAT_NOW');
define(exports.emailParsingTypesReverse, 6, 'HUNGRY_HOUSE');
define(exports.emailParsingTypesReverse, 7, 'HR_24_ANY_FOOD');
exports.mailParserEmails = {};
define(exports.mailParserEmails, 2, 'mwirqzlx@mailparser.io');
define(exports.mailParserEmails, 3, 'cqemolxf@mailparser.io');
define(exports.mailParserEmails, 4, 'phqoglrf@mailparser.io');
define(exports.mailParserEmails, 5, 'arfbewcv@mailparser.io');
define(exports.mailParserEmails, 6, 'ancpxthe@mailparser.io');
define(exports.mailParserEmails, 7, 'njqlxigd@mailparser.io');
exports.reverseAddOn = {
    0: 'Product Cost',
    1: 'Routing',
    2: 'Invoicing',
    3: 'Fleet_Create_task',
    4: 'Number_masking',
    5: 'VENDOR_FORM',
    6: 'CUSTOM_CSV',
    7: 'EMAIL_PARSING',
    8: 'MESSAGING',
};

exports.alert_type = {
    1: 'was cancelled by Agent',
    2: 'could not be Auto-Assigned by the system due to unavailability of agents',
};

exports.highest = {};
define(exports.highest, 'VALUE', 999999999999999999);

exports.RADIUS = {};
define(exports.RADIUS, 'RADIUS_VALUE', 10);
define(exports.RADIUS, 'SITE_RADIUS', 5);

exports.per_cost = {};
define(exports.per_cost, 'FLEET', 10.00);
define(exports.per_cost, 'TASK', 0.10);


exports.note_by = {};
define(exports.note_by, 'COMPANY', 0);
define(exports.note_by, 'VENDOR', 1);
define(exports.note_by, 'FLEET', 2);
define(exports.note_by, 'SA', 3);
define(exports.note_by, 'COMPANY_USER', 4);
define(exports.note_by, 'SUB_COMPANY', 5);
define(exports.note_by, 'SUB_VENDOR', 6);


exports.batchConfig = {};
define(exports.batchConfig, 'STARTING_RADIUS', 5);
define(exports.batchConfig, 'INC_RADIUS', 2);
define(exports.batchConfig, 'RADIUS_LIMIT', 10);
define(exports.batchConfig, 'BATCH_TIME', 30);
define(exports.batchConfig, 'ACCEPT_TIME', 60);
define(exports.batchConfig, 'BATCH_SIZE', 10);
define(exports.batchConfig, 'INC_BATCH_SIZE', 10);
define(exports.batchConfig, 'TIMER', 30);
define(exports.batchConfig, 'ATTEMPT_LIMIT', 5);

// VERSION CONSTANTS
exports.refreshVersions = function() {
    myContext.fetchVersions((results) => {
        console.log(JSON.stringify(results));
    });
};
exports.fetchVersions = function(callback) {
    const sql = 'SELECT * FROM `tb_version2` order by user_id';
    connection.query(sql, (err, version) => {
        if (err) {} else {
            if (version && version.length) {
                exports.appVersions = {};

                // 0 for Android
                // 1 for ios.
                let versions = {},
                    scopeworkerAndroidPath = {
                        path: version[0].path,
                        brand_name: version[0].brand_name,
                        gateway: version[0].gateway,
                    },
                    scopeworkerIosPath = {
                        path: version[1].path,
                        brand_name: version[1].brand_name,
                        gateway: version[1].gateway,
                    };
                // version.forEach(function (v) {
                //    if (v.user_id) {
                //        versions[v.device_type] = versions[v.device_type] || {};
                //        versions[v.device_type] = {
                //            path: v.path,
                //            brand_name: v.brand_name,
                //            gateway: v.gateway
                //        };
                //
                //    }
                // });

                versions[0] = scopeworkerAndroidPath;
                versions[1] = scopeworkerIosPath;

                exports.appVersions = versions;
            }
            return callback(exports.appVersions);
        }
    });
};

// Jade pass
exports.password = 'clickscopeworker1';
exports.billingpassword = 'billingscopeworker1';

function authenticateJade(name, pass) {
    switch (name) {
        case 'billing':
            if (pass == module.exports.billingpassword) {
                return name;
            }

            return 0;

            break;
        default:
            if (pass == module.exports.password) {
                return name;
            }

            return 0;

    }
}
exports.authenticateJade = authenticateJade;

exports.cloudFlareDetails = {};
define(exports.cloudFlareDetails, 'KEY', '1212');
define(exports.cloudFlareDetails, 'EMAIL', '1212');
define(exports.cloudFlareDetails, 'BASEDOMAIN', '1212.io');
define(exports.cloudFlareDetails, 'IP', '121212');

exports.robin_round = {};
define(exports.robin_round, 'radius', 10);
define(exports.robin_round, 'tasks', 4);

exports.zoho_constants = {};
define(exports.zoho_constants, 'ZOHO_KEY', '12121212');
exports.workflow_actionType = {};
define(exports.workflow_actionType, 'DEFAULT', 0);
define(exports.workflow_actionType, 'FIELDS_OPTIONALFIELD', 1);
define(exports.workflow_actionType, 'FIELDS_CUSTOMFIELD', 2);
define(exports.workflow_actionType, 'AUTO_ASSIGNMENT', 3);
exports.workflow_actionType_reverse = { 1: 'app_optional_fields', 2: 'custom_field', 3: 'auto_assign' };
exports.daily_signup_emails = {};
define(exports.daily_signup_emails, 'EMAIL', ['saral@tookanapp.com', 'sachin.gupta@click-labs.com', 'sanyam.raina@mail.click-labs.com', 'arsh@tookanapp.com',
    'kunal.sethiya@click-labs.com', 'sumeet@clicklabs.in', 'shubham.sharma@mail.click-labs.com'
]);
exports.defaultTemplate = {};
define(exports.defaultTemplate, 'DATA', [
    // Delivery
    {
        template_key: 'REQUEST_RECEIVED',
        email_message: 'Hi [CustomerName],<br><br>Your request has been received and it is scheduled for delivery on [EndDate] before [EndTime].<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Your request has been received!',
        sms_text: 'Hi [CustomerName], your request has been received and it is scheduled for delivery on [EndDate] before [EndTime].',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 1,
        sms_enabled: 1,
        layout_type: 1,
    },
    {
        template_key: 'AGENT_STARTED',
        email_message: 'Hey [CustomerName],<br><br>Your order is on its way. To view [AgentName] s location live on the map open <br>[TrackingLink]<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Your order is on it’s way!',
        sms_text: 'Hey [CustomerName] your order is on its way. To view [AgentName] s location live on the map open [TrackingLink]',
        variable_names: ['[ETA]', '[TaskID]', '[AgentName]', '[AgentPhone]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 1,
        sms_enabled: 1,
        layout_type: 1,
    },
    {
        template_key: 'AGENT_ARRIVED',
        email_message: 'Hi [CustomerName],<br><br>Your order has reached its destination. Please collect your order from [AgentName].<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Your order has reached its destination!',
        sms_text: 'Hi [CustomerName]! your order has reached its destination. Please collect your order from [AgentName].',
        variable_names: ['[TaskID]', '[AgentName]', '[AgentPhone]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 0,
        sms_enabled: 0,
        layout_type: 1,
    },
    {
        template_key: 'SUCCESSFUL',
        email_message: 'Hi [CustomerName],<br><br>Your order was successfully delivered today at [CompletedTime]. Please rate your experience <br>[TrackingLink]<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Your order has been delivered!',
        sms_text: 'Hi [CustomerName]! Your order was successfully delivered today at [CompletedTime]. Please rate your experience [TrackingLink]',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]', '[CompletedDate]', '[CompletedTime]', '[TotalTimeTaken]', '[TotalDistanceTravelled]', '[SignImage]'],
        email_enabled: 1,
        sms_enabled: 1,
        layout_type: 1,
    },
    {
        template_key: 'FAILED',
        email_message: 'Hi [CustomerName],<br><br>We tried, but were unable to deliver your today at [CompletedTime]. Please contact us at [ManagerNumber].<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'We tried, but were unable to deliver your today',
        sms_text: 'We tried, but were unable to deliver your today at [CompletedTime]. Please contact us at [ManagerNumber].',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]', '[CompletedDate]', '[CompletedTime]', '[TotalTimeTaken]', '[TotalDistanceTravelled]', '[ManagerNumber]'],
        email_enabled: 0,
        sms_enabled: 0,
        layout_type: 1,
    },
    // Pickup
    {
        template_key: 'REQUEST_RECEIVED',
        email_message: 'Hi [CustomerName],<br><br>Your pick-up request has been received and it is scheduled for [StartDate] before [StartTime].<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Your pick-up request has been received!',
        sms_text: 'Hi [CustomerName], your pick-up request has been received and it is scheduled for [StartDate] before [StartTime].',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 1,
        sms_enabled: 1,
        layout_type: 0,
    },
    {
        template_key: 'AGENT_STARTED',
        email_message: 'Hey [CustomerName],<br><br>Our member [AgentName] is on its way. To track the location live on the map open <br>[TrackingLink]<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Our member [AgentName] is on its way!',
        sms_text: 'Hi [CustomerName], our member [AgentName] is on its way. To track the location live on the map open [TrackingLink]',
        variable_names: ['[ETA]', '[TaskID]', '[AgentName]', '[AgentPhone]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 1,
        sms_enabled: 1,
        layout_type: 0,
    },
    {
        template_key: 'AGENT_ARRIVED',
        email_message: 'Hi [CustomerName],<br><br>Our fleet member [AgentName] has reached the destination. Please say hi and handover the pick-up consignment.<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Our fleet member [AgentName] has reached its destination!',
        sms_text: 'Hi [CustomerName], our fleet member [AgentName] has reached the destination. Please say hi and handover the pick-up consignment.',
        variable_names: ['[TaskID]', '[AgentName]', '[AgentPhone]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 0,
        sms_enabled: 0,
        layout_type: 0,
    },
    {
        template_key: 'SUCCESSFUL',
        email_message: 'Hi [CustomerName],<br><br>Your consignment was successfully picked up today at [CompletedTime]. Please rate your experience <br>[TrackingLink]<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Your consignment was successfully picked!',
        sms_text: 'Hi [CustomerName]! Your consignment was successfully picked up today at [CompletedTime]. Please rate your experience [TrackingLink]',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]', '[CompletedDate]', '[CompletedTime]', '[TotalTimeTaken]', '[TotalDistanceTravelled]', '[SignImage]'],
        email_enabled: 1,
        sms_enabled: 1,
        layout_type: 0,
    },
    {
        template_key: 'FAILED',
        email_message: 'Hi [CustomerName],<br><br>We tried, but were unable to pick-up your consignment today at [CompletedTime]. Please contact us at [ManagerNumber].<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'We tried, but were unable to pick-up your consignment',
        sms_text: 'Hi [CustomerName]! We tried, but were unable to pick-up your consignment today at [CompletedTime]. Please contact us at [ManagerNumber]',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]', '[CompletedDate]', '[CompletedTime]', '[TotalTimeTaken]', '[TotalDistanceTravelled]', '[ManagerNumber]'],
        email_enabled: 0,
        sms_enabled: 0,
        layout_type: 0,
    },
    // Appointment
    {
        template_key: 'REQUEST_RECEIVED',
        email_message: 'Hi [CustomerName],<br><br>Your service request has been received and it is scheduled for [StartDate] before [StartTime].<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Your service request has been received!',
        sms_text: 'Hi [CustomerName], your service request has been received and it is scheduled for [StartDate] before [StartTime].',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 0,
        sms_enabled: 1,
        layout_type: 3,
    },
    {
        template_key: 'AGENT_STARTED',
        email_message: 'Hey [CustomerName],<br><br>Our service agent [AgentName] is on it’s way. To track the location live on the map open <br>[TrackingLink]<br>Best,<br>Team [CompanyName]',
        email_subject: 'Our service agent [AgentName] is on its way!',
        sms_text: 'Hi [CustomerName], our service agent [AgentName] is on its way. To track the location live on the map open [TrackingLink]',
        variable_names: ['[ETA]', '[TaskID]', '[AgentName]', '[AgentPhone]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 0,
        sms_enabled: 1,
        layout_type: 3,
    },
    {
        template_key: 'AGENT_ARRIVED',
        email_message: 'Hi [CustomerName],<br><br>Our service agent [AgentName] has reached the destination. Please say hi.<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Our service agent [AgentName] has reached its destination!',
        sms_text: 'Hi [CustomerName], our service agent [AgentName] has reached the destination. Please say hi and handover the pick-up consignment.',
        variable_names: ['[TaskID]', '[AgentName]', '[AgentPhone]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 0,
        sms_enabled: 0,
        layout_type: 3,
    },
    {
        template_key: 'SUCCESSFUL',
        email_message: 'Hi [CustomerName],<br><br>Your service was successfully completed today at [CompletedTime]. Please rate your experience <br>[TrackingLink]<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Your service was successfully complete!',
        sms_text: 'Hi [CustomerName]! Your service was successfully complete up today at [CompletedTime]. Please rate your experience [TrackingLink]',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]', '[CompletedDate]', '[CompletedTime]', '[TotalTimeTaken]', '[TotalDistanceTravelled]', '[SignImage]'],
        email_enabled: 0,
        sms_enabled: 1,
        layout_type: 3,
    },
    {
        template_key: 'FAILED',
        email_message: 'Hi [CustomerName],<br><br>We tried, but were unable to complete your service request today at [CompletedTime]. Please contact us at [ManagerNumber].<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'We tried, but were unable to complete your service request',
        sms_text: 'Hi [CustomerName]! We tried, but were unable to complete your service request today at [CompletedTime]. Please contact us at [ManagerNumber]',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]', '[CompletedDate]', '[CompletedTime]', '[TotalTimeTaken]', '[TotalDistanceTravelled]', '[ManagerNumber]'],
        email_enabled: 0,
        sms_enabled: 0,
        layout_type: 3,
    },
    // FOS
    {
        template_key: 'REQUEST_RECEIVED',
        email_message: 'Hi [CustomerName],<br><br>Your service request has been received and it is scheduled for [StartDate] before [StartTime].<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Your service request has been received!',
        sms_text: 'Hi [CustomerName], your service request has been received and it is scheduled for [StartDate] before [StartTime].',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 0,
        sms_enabled: 1,
        layout_type: 2,
    },
    {
        template_key: 'AGENT_STARTED',
        email_message: 'Hey [CustomerName],<br><br>Our agent [AgentName] is on its way. To track the location live on the map open <br>[TrackingLink]<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Our agent [AgentName] is on it’s way!',
        sms_text: 'Hi [CustomerName], our agent [AgentName] is on its way. To track the location live on the map open [TrackingLink]',
        variable_names: ['[ETA]', '[TaskID]', '[AgentName]', '[AgentPhone]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 0,
        sms_enabled: 1,
        layout_type: 2,
    },
    {
        template_key: 'AGENT_ARRIVED',
        email_message: 'Hi [CustomerName],<br><br>Our agent [AgentName] has reached the destination. Please say hi.<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Our agent [AgentName] has reached its destination!',
        sms_text: 'Hi [CustomerName], our agent [AgentName] has reached the destination. Please say hi and handover the pick-up consignment.',
        variable_names: ['[TaskID]', '[AgentName]', '[AgentPhone]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]'],
        email_enabled: 0,
        sms_enabled: 0,
        layout_type: 2,
    },
    {
        template_key: 'SUCCESSFUL',
        email_message: 'Hi [CustomerName],<br><br>Your service was successfully completed today at [CompletedTime]. Please rate your experience <br>[TrackingLink]<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'Your service was successfully complete!',
        sms_text: 'Hi [CustomerName]! Your service was successfully complete up today at [CompletedTime]. Please rate your experience [TrackingLink]',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]', '[CompletedDate]', '[CompletedTime]', '[TotalTimeTaken]', '[TotalDistanceTravelled]', '[SignImage]'],
        email_enabled: 0,
        sms_enabled: 1,
        layout_type: 2,
    },
    {
        template_key: 'FAILED',
        email_message: 'Hi [CustomerName],<br><br>We tried, but were unable to complete your service request today at [CompletedTime]. Please contact us at [ManagerNumber].<br><br>Best,<br>Team [CompanyName]',
        email_subject: 'We tried, but were unable to complete your service request',
        sms_text: 'Hi [CustomerName]! We tried, but were unable to complete your service request today at [CompletedTime]. Please contact us at [ManagerNumber]',
        variable_names: ['[TaskID]', '[CustomerName]', '[CustomerAddress]', '[CompanyName]', '[TrackingLink]', '[StartDate]', '[StartTime]', '[EndDate]', '[EndTime]', '[CompletedDate]', '[CompletedTime]', '[TotalTimeTaken]', '[TotalDistanceTravelled]', '[ManagerNumber]'],
        email_enabled: 0,
        sms_enabled: 0,
        layout_type: 2,
    },
]);

exports.allowedColumnsToUpdate = [
    'has_fleet_create_task',
    'distance_in',
    'language',
    'map_theme',
    'has_traffic_layer',
    'has_completed_tasks',
    'whats_new',
    'setup_wizard_step',
];

exports.SA_ACCESS_TOKEN_TTL = 60;

exports.VENDOR_PARAMS = ['default_labor', 'discount_labor', 'historic_labor', 'historic_equipment', 'historic_material', 'sla_compliance', 'sla_fail', 'audited_quality', 'historic_market', 'warranty_revisit'];

exports.SENDER_EMAIL = {
  general: 'team@scopeworker.com',
};

exports.PANEL_URLS = {
  company: 'http://scopeworker.com',
  vendor: 'http://vendor.scopeworker.com',
  sa: 'http://admin.scopeworker.com',
};

var vendorRejected = `${ i18n.__('vendor') } Rejected`;

var ticketStatusObj = {
    'Acknowledgement Pending': 1,
    'Accepted': 2,
    'Deleted': 4,
    'Pending Award': 5,
    'Cancelled': 6,
    'Reassigned': 7,
    'In Bidding Event': 8
};

ticketStatusObj[vendorRejected] = 3;

exports.ticketStatusObj = ticketStatusObj;

exports.ticketStatusValue = {
    1: 'Acknowledgement Pending',
    2: 'Accepted',
    3: `${i18n.__('vendor')} Rejected`,
    4: 'Deleted',
    5: 'Pending Award',
    6: 'Cancelled',
    7: 'Reassigned',
    8: 'In Bidding Event'
};

exports.WORK_DONE_STATUS = {
    1: 'No work has been done',
    2: 'Partial work has been done',
    3: `Ask ${i18n.__('vendor')} to file the amount of work done`
};

exports.WORK_DONE_STATUS_VALUE = {
    NO_WORK_HAS_BEEN_DONE: 1,
    PARTIAL_WORK_HAS_BEEN_DONE: 2,
    ASK_VENDOR_TO_FILE_AMOUNT_OF_WORK_DONE: 3
};

exports.jobStatusObj = {
    Assigned: 0,
    Started: 1,
    Ended: 2,
    Failed: 3,
    Arrived: 4,
    Partial: 5,
    Unassigned: 6,
    Accepted: 7,
    Declined: 8,
    Cancel: 9,
    Deleted: 10,
    Ignored: 11,
    'In Transit Billable': 12,
    'In Transit Non-Billable': 13,
    'Working on Site': 14,
    'On Hold': 15,
    'NTE Approval': 16,
    'Continue Work': 17,
    'NTE Approved': 18,
    'NTE Rejected': 19,
    'End Of Day': 20,
    'Cancelled': 21,
    'Reassigned': 22
};

exports.MAX_FILE_UPLOAD_SIZE = 400 * 1024 * 1024;
exports.WATSON_MAX_FILES_UPLOAD_SIZE = 256 * 1024 * 1024;
exports.WATSON_MAX_FILE_UPLOAD_SIZE = 100 * 1024 * 1024;
exports.MIN_IMAGES_COUNT = 10;
exports.MAX_IMAGES_COUNT = 10000;
exports.SIGNED_URL_EXPIRATION_TIME = 60 * 10;
exports.SIGNED_URL_EXPIRATION_TIME_FOR_CSV = 7 * 24 * 60 * 60;



exports.WORKFLOW_SUPPORTED_DATA_TYPES = ['Barcode', 'Checkbox', 'Checklist', 'Date', 'Database Field', 'Dropdown', 'Email', 'File', 'Number', 'Telephone', 'Text', 'URL', 'QR Code', 'Image', 'Video', 'Radio', 'Signature'];
exports.WORKFLOW_SUPPORTED_DOWNLOAD_DATA_TYPES = ['File', 'Image', 'Video'];
exports.WORKFLOW_SUPPORTED_DOWNLOAD_DATA_TYPES_SIZE_RES = ['File', 'Image', 'Video','Signature'];

exports.WORKFLOW_SUPPORTED_NOMENCLATURE_TYPES = ['site_id', 'contract_id', 'field_name', 'date_time'];

exports.WORKFLOW_SUPPORTED_DATA_TYPE = {
    BARCODE: 'Barcode',
    CHECKBOX: 'Checkbox',
    CHECKLIST: 'Checklist',
    DATE: 'Date',
    DATABASE_FIELD: 'Database Field',
    DROPDOWN: 'Dropdown',
    EMAIL: 'Email',
    FILE: 'File',
    NUMBER: 'Number',
    TELEPHONE: 'Telephone',
    TEXT: 'Text',
    URL: 'URL',
    QR_CODE: 'QR Code',
    IMAGE: 'Image',
    VIDEO: 'Video',
    RADIO: 'Radio',
    SIGNATURE: 'Signature'
}

exports.FORM_FIELD_SUPPORTED_DATA_TYPES = ['Barcode', 'Checkbox', 'Checklist', 'Date', 'Database Field', 'Dropdown', 'Email', 'File', 'Number', 'Telephone', 'Text', 'URL', 'QR Code', 'Image', 'Video', 'Radio', 'Signature','Info Para'];
exports.CONTRACT_TYPE_FORM_FIELD_SUPPORTED_DATA_TYPES = ['Barcode', 'Checkbox', 'Checklist', 'Date', 'Database Field', 'Dropdown', 'Email', 'File', 'Number', 'Telephone', 'Text', 'URL', 'QR Code', 'Image', 'Video', 'Radio', 'Signature','Info Para'];
exports.FORM_FIELD_SUPPORTED_DOWNLOAD_DATA_TYPES = ['File', 'Image', 'Video'];

exports.uploader = {
    COMPANY: 0,
    VENDOR: 1,
    'LIMITED-VENDOR': 2,
    'SUB-VENDOR': 3,
    'SUB-COMPANY': 4,
};


exports.invoiceStatusObj = {
    'Invoice Pending': 0,
    'Invoice Generated': 1,
    'Invoice Rejected': 2,
    Paid: 3,
};


exports.acceptanceCriteriaStatus = {
    Open: 1,
    Submitted: 2,
    Approved: 3,
    Rejected: 4,
};

exports.CREATION_MODE_MAP = {
    1: 'standard',
    2: 'standard-edit',
    3: 'clone',
    4: 'scratch',
    5: 'reassign'
};

exports.REVERSE_CREATION_MODE_MAP = {
    'STANDARD': 1,
    'STANDARD-EDIT': 2,
    'CLONE': 3,
    'SCRATCH': 4,
    'REASSIGN': 5
};


exports.TICKET_SELECTION_TYPE = {
    'AUTO': 1,
    'MANUAL': 2,
    'NEAREST': 3
};


exports.reverseAcceptanceCriteriaStatus = {
    0: 'Others',
    1: 'Open',
    2: 'Submitted',
    3: 'Approved',
    4: 'Rejected',
};


exports.chatChannelTypes = {
    FLEET_COMPANY: 0,
    FLEET_VENDOR: 1,
};


exports.analyticsActivityType = {
    TICKET_CREATION: 'TICKET_CREATION',
    TASK_STATUS_CHANGE: 'TASK_STATUS_CHANGE',
};


exports.programTypes = {
    P1: 'P1',
};

exports.avettaKey = {
    apiKey: '1cxj1mvnn8e952untpp2sv0sla4vdocb',
};

exports.TICKETTYPE = {};
define(exports.TICKETTYPE, 'FIRSTTYPE', 1);
define(exports.TICKETTYPE, 'SECONDTYPE', 2);

exports.SCHEDULESTATUS = {};
define(exports.SCHEDULESTATUS, 'SCHEDULEDATE', 'SCHEDULE');
define(exports.SCHEDULESTATUS, 'FORCASTDATE', 'FORECAST');
define(exports.SCHEDULESTATUS, 'BOTHSTATUS', 'BOTH');


exports.level = {
    Program: 1,
    Project: 2,
};

exports.LEVEL = {
    DAYS: 1,
    DATE_RANGE: 2,
    DATE: 0
}

exports.reverseLevel = {
    1: 'Program',
    2: 'Project',
};

exports.image_approval_status = {
    0: 'Default',
    1: 'Open',
    2: 'Submitted',
    3: 'Approved',
    4: 'Rejected',
};

exports.jobStatusObj1 = [
    'ASSIGNED',
    'STARTED',
    'InTransitBillable',
    'OnHold',
    'WorkingOnSite',
    'EndOfDay',
    'InTransitNonBillable',
    'ContinueWork',
    'NTEApproval',
    'NTEApproved',
    'NTERejected',
];

exports.GENERICCSVFIELDS = [
    'Generic_item_id',
    'item',
    'bidzone',
    'price',
];

exports.GENERICDATA = [{
        Generic_item_id: 17,
        item: 'generic 1(test)',
        bidzone: 'ABCD112',
        price: 100,
    },
    {
        Generic_item_id: 18,
        item: 'generic 2(test)',
        bidzone: 'NENJ02',
        price: 50,
    },
    {
        Generic_item_id: 19,
        item: 'generic 2',
        bidzone: 'NEBOS01',
        price: 20,
    },
    {
        Generic_item_id: 20,
        item: 'generic 3',
        bidzone: 'NENJ0264',
        price: 10,
    },
];

exports.INVAITION_STATUS = {};
define(exports.INVAITION_STATUS, 'PENDING', 2);
define(exports.INVAITION_STATUS, 'NOT_SENT', 1);
define(exports.INVAITION_STATUS, 'ACCEPTED', 3);

exports.tbVendorCrewTypeDetails = {
    P1: 1,
    P2: 1,
    P3: 1,
    P4: 1,
    P5: 1,
    P6: 1,
    DISCOUNT: 0.0,
    CREWDETAILS: 3,
};


exports.ACCESS_PREMISSION = {};
define(exports.ACCESS_PREMISSION, 'READ', 0);
define(exports.ACCESS_PREMISSION, 'READ_WRITE', 1);
define(exports.ACCESS_PREMISSION, 'HIDDEN', 2);

exports.MANDATORY = {};
define(exports.MANDATORY, 'IS_MANDATORY', 1);
define(exports.MANDATORY, 'IS_NOT_MANDATORY', 0);

exports.CONTRACT_TEMPLATE_STEP = {};
define(exports.CONTRACT_TEMPLATE_STEP, 'FIRST_STEP', 1);
define(exports.CONTRACT_TEMPLATE_STEP, 'SECOND_STEP', 2);
define(exports.CONTRACT_TEMPLATE_STEP, 'THIRD_STEP', 3);
define(exports.CONTRACT_TEMPLATE_STEP, 'FOURTH_STEP', 4);
define(exports.CONTRACT_TEMPLATE_STEP, 'FIVTH_STEP', 5);
define(exports.CONTRACT_TEMPLATE_STEP, 'SIXTH_STEP', 6);
define(exports.CONTRACT_TEMPLATE_STEP, 'SEVENTH_STEP', 7);
define(exports.CONTRACT_TEMPLATE_STEP, 'EIGHTH_STEP', 8);

exports.TIMEOUT = {};
define(exports.TIMEOUT, 'CALL_TIMEOUT', 60);
define(exports.TIMEOUT, 'CALL_TIMEOUT_MSEC', 1000);

exports.ROLES_TEMPLATE_STEP = {};
define(exports.ROLES_TEMPLATE_STEP, 'FIRST_STEP', 1);
define(exports.ROLES_TEMPLATE_STEP, 'SECOND_STEP', 2);
define(exports.ROLES_TEMPLATE_STEP, 'THIRD_STEP', 3);

exports.ROLE_STATUS = {};
define(exports.ROLE_STATUS, 'ACTIVE', 1);
define(exports.ROLE_STATUS, 'NO_ACTIVE', 0);

exports.COMPANY = {};
define(exports.COMPANY, 'COMPANY_FLAG', 0);
define(exports.COMPANY, 'SUB_COMPANY_FLAG', 1);
define(exports.COMPANY, 'USER_FLAG', 2);
define(exports.COMPANY, 'VENDOR_FLAG', 3);
define(exports.COMPANY, 'SA', 4);
define(exports.COMPANY, 'SUB_VENDOR_FLAG', 5);
define(exports.COMPANY, 'FLEET_FLAG', 6);

exports.TABLE_NAME_USER_TYPE = {
    0: 'tb_companies',
    1: 'tb_sub_companies',
    2: 'tb_role_user',
    3: 'tb_users',
    4: 'tb_super_admin',
    5: 'tb_sub_users',
    6: 'tb_fleets'
}
exports.SECTION_OPTIONS = {
    GENERAL_NOTE: 1,
    PLANNED: 2,
    FORECAST: 3,
    ACTUAL_DATE: 4
};

exports.MILESTONE_DATE_TYPES_TEXT = {
    PLANNED: 'planned',
    FORECAST: 'forecast',
    ACTUAL_DATE: 'actual'
};

if(config.get('service_category_required')) {
    exports.ITEM_TYPES = {
        LABOUR: 'Labor',
        MATERIAL : 'Materials',
        EQUIPMENT : 'Equipments',
        MISC : 'Misc'
    }
} else {
    exports.ITEM_TYPES = {
        LABOUR: 'Labor',
        MATERIAL : 'Materials',
        EQUIPMENT : 'Equipments',
        MISC : 'Misc',
        MISCELLANEOUS:{
            LABOUR:'LMIS',
            MATERIAL:'MMIS',
            EQUIPMENT : 'EMIS'
        }
    }
}

exports.DEFAULT_WEIGHTS = {
    'historic_material_change_order': 10,
    'historic_equipment_change_order': 10,
    'contract_rejection_rate': 10,
    'acceptance_rejection_rate': 10,
    'customer_rating': 10,
    'historic_labor_change_order': 10,
    'sla_compliance': 10,
    'catalog_po_price': 10,
    'discounted_po_price': 10
}
exports.SCOREBOARD_PARAMS = [
    'historic_material_change',
    'historic_equipment_change',
    'contract_rejection_rate',
    'acceptance_rejection_rate',
    'customer_rating',
    'historic_labor_change',
    'sla_compliance'
]

exports.DEFAULT_REJECTION_REASONS = [
    { rejection_reason: "Don’t have crews available.", is_negative: 0, to_delete: 0 },
    { rejection_reason: "PO line items are wrong.", is_negative: 0, to_delete: 0 },
    { rejection_reason: "Don’t agree with the price of the PO line items.", is_negative: 0, to_delete: 0 },
]

exports.MILESTONE_TYPE = {
    PROGRAM: 1,
    PROJECT: 2,
    TICKET: 3
}

exports.APPROVAL_STATUS = {
    PENDING: 0,
    APPROVED: 1,
    REJECTED: 2
}

exports.OVERALL_STATUS = {
  0:'Open',
  1:`Submitted Pending ${i18n.__('vendor')} Approval`,
  2:`Submitted pending ${i18n.__('company')} approval`,
  3:'Approved',
  4:'Rejected',
  5:'Not Applicable'
};
exports.OVERALL_STATUS_VALUE = {
    'OPEN': 0,
    'SUBMITTED_PENDING_VENDOR_APPROVAL': 1,
    'SUBMITTED_PENDING_COMPANY_APPROVAL': 2,
    'APPROVED': 3,
    'REJECTED': 4,
    'NOT_APPLICABLE': 5
};

exports.WORKFLOW_FIELD_STATUS = {
    0: 'Open',
    1: 'Submitted - Approval not required',
    2: `Submitted - Pending ${i18n.__('company')} Approval`,
    3: `Submitted - Pending ${i18n.__('vendor')} Approval`,
    4: `Submitted - Pending ${i18n.__('company')} Approval, Submitted - Pending ${i18n.__('vendor')} Approval`,
    5: `Submitted - Pending ${i18n.__('company')} Approval, ${i18n.__('vendor')} Approved`,
    6: `Submitted - Pending ${i18n.__('vendor')} Approval, ${i18n.__('company')} Approved`,
    7: `Submitted - Approved ${i18n.__('company')}`,
    8: `Submitted - Approved ${ i18n.__('vendor') }`,
    9: 'Rejected',
    10: 'Approved'
};


exports.WORKFLOW_FIELD_STATUS_VALUE = {
    0: 'Open',
    1: 'Submitted - Approval not required',
    2: `Submitted - Pending ${i18n.__('company')} Approval`,
    3: `Submitted - Pending ${i18n.__('vendor')} Approval`,
    4: `Submitted - Pending ${i18n.__('company')} Approval, Pending ${i18n.__('vendor')} Approval`,
    5: `Submitted - Pending ${i18n.__('company')} Approval, ${i18n.__('vendor')} Approved`,
    6: `Submitted - Pending ${i18n.__('vendor')} Approval, ${i18n.__('company')} Approved`,
    7: `Submitted - Approved ${i18n.__('company')}`,
    8: `Submitted - Approved ${i18n.__('vendor')}`,
    9: 'Rejected',
    10: 'Approved'
};

exports.WORKFLOW_FIELD_STATUS = {
    'OPEN': 0,
    'SUBMITTED_APPROVAL_NOT_REQUIRED': 1,
    'SUBMITTED_PENDING_COMPANY_APPROVAL': 2,
    'SUBMITTED_PENDING_VENDOR_APPROVAL': 3,
    'SUBMITTED_PENDING_COMPANY_VENDOR_APPROVAL': 4,
    'SUBMITTED_PENDING_COMPANY_APPROVAL_VENDOR_APPROVED': 5,
    'SUBMITTED_PENDING_VENDOR_APPROVAL_COMPANY_APPROVED': 6,
    'SUBMITTED_APPROVED_COMPANY': 7,
    'SUBMITTED_APPROVED_VENDOR': 8,
    'REJECTED': 9,
    'APPROVED': 10
};

exports.WORKFLOW_STATUS = {
    0: 'OPEN',
    1: 'Approval not required',
    2: `Pending ${i18n.__('company')} Approval`,
    3: `Pending ${i18n.__('vendor')} Approval`,
    4: `Pending ${i18n.__('company')} Approval, Pending ${i18n.__('vendor')} Approval`,
    5: `Pending ${i18n.__('company')} Approval, ${i18n.__('vendor')} Approved`,
    6: `Pending ${i18n.__('vendor')} Approval, ${i18n.__('company')} Approved`,
    7: `Approved ${i18n.__('company')}`,
    8: `Approved ${i18n.__('vendor')}`,
    9: 'Rejected',
    10:'Approved'
}

const CALL_STATUS = exports.CALL_STATUS = {
    ERROR: 0,
    ACCEPTED: 1,
    REJECTED: 2,
    COMPLETED: 3,
    MISSED: 4,
    NEW: 5
};

exports.USER_TYPE = {
    COMPANY: 'COMPANY',
    VENDOR: 'VENDOR',
    FLEET: 'FLEET',
    COMPANY_USER: 'COMPANY_USER',
    SUB_COMPANY: 'SUB_COMPANY',
    SUB_VENDOR:'SUB_VENDOR',
};
// TODO :- Need to merge USER_TYPE & USER_MAPPINGS
exports.USER_MAPPINGS = {
    C: i18n.__('carrier'),
    V: i18n.__('vendor'),
    U: "User"
}
exports.CALL_STATUS_MAP = new Map([
    [CALL_STATUS.ACCEPTED, 'CAll Accepted'],
    [CALL_STATUS.ERROR, 'Network or call Error'],
    [CALL_STATUS.REJECTED, 'CAll Rejected'],
    [CALL_STATUS.COMPLETED, 'CAll Completed'],
    [CALL_STATUS.MISSED, 'CAll Missed'],
    [CALL_STATUS.NEW, 0]
]);

exports.FORM_FIELD_ACTION_TYPE = {
    ADDED: 'Added',
    DELETED: 'Deleted',
};

exports.WORKFLOW_FIELD_ACTION_TYPE = {
    SUBMITTED: 'Submitted',
    APPROVED: 'Approved',
    DELETED: 'Deleted',
    REJECTED: 'Rejected'
};

exports.SOCKET_EXPORT_TO_CSV_ERROR = {
    FILE_NOT_EXPORTED: 'Failed to export CSV Report',
    FILE_EXPORTED: 'File Successfully sent to your email'
};

exports.EMAIL_TEMPLATES = {
    COMPLETE_RIDE: 'templates/email_templates/complete_ride.html',
    // VENDOR_ASSIGNED: 'templates/email_templates/vendor_assigned.html',
    // JOB_STARTED: 'templates/email_templates/job_started.html',
    // JOB_ENDED: 'templates/email_templates/job_ended.html',
    // CHANGE_ORDER: 'templates/email_templates/change_order.html',
    // CHANGE_ORDER_INITIATED: 'templates/email_templates/change_order_initiated.html',
    // CHANGE_ORDER_INITIATED_VENDOR: 'templates/email_templates/change_order_initiated_vendor.html',
    // CHANGE_ORDER_FLEETS: 'templates/email_templates/change_order_fleets.html',
    // ASSIGN_FLEET: 'templates/email_templates/assign_fleet.html',
    // INACTIVE_ACCOUNT: 'templates/email_templates/inactive_account.html',
    // SITE_ALLOCATION_CHANGES: 'templates/email_templates/site_allocation_changes.html',
    // CUSTOM_FIELDS: 'templates/email_templates/custom_fields.html',
    // TICKET_COMPLETED: 'templates/email_templates/ticket_completed.html',
    // INVOICE_TICKET: 'templates/email_templates/invoice_ticket.html',
    // NEW_TICKET_RECEPIENT: 'templates/email_templates/new_ticket_recepient.html',
    // RESET_PASSWORD: 'templates/email_templates/reset_password.html',
    // BULK_TICKETS_VENDOR_ASSIGNED: 'templates/email_templates/bulk_tickets_vendor_assigned.html',
    // EMAIL_TO_CONTACTS_ON_BULK_TICKETS: 'templates/email_templates/email_to_contacts_on_bulk_tickets.html',
    // BID_REMINDER: 'templates/email_templates/bid_reminder.html',
    // BID_VENDOR_PARTICIPANT: 'templates/email_templates/bid_vendor_participant.html',
    // CHANGE_ORDER_APPROVAL: 'templates/email_templates/change_order_approval.html',
    // PROJECT_INVITATION: 'templates/email_templates/project_invitation.html',
    // ADD_AGENT: 'templates/email_templates/add_agent.html',
    // FORGOT_PASSWORD: 'templates/email_templates/forgot_password.html',
    // GENERAL: 'templates/email_templates/general.html',
    // REASSIGN_AGENT: 'templates/email_templates/reassign_agent.html',
    // MILESTONE_STATUS: 'templates/email_templates/milestone_status.html',
    // BID_NOTIFICATION: 'templates/invoice_template/email-templates/bid_notification.html',
    // BID_PUBLISHED: 'templates/invoice_template/email-templates/bid_published.html',
    // BID_UPDATED: 'templates/invoice_template/email-templates/bid_updated.html',
    // BID_VENDOR_ADDED_PARTICIPANT: 'templates/invoice_template/email-templates/bid_vendor_added_participant.html',
    // BID_VENDOR_REMOVED_PARTICIPANT: 'templates/invoice_template/email-templates/bid_vendor_removed_participant.html',
    // BID_ACCEPTANCE: 'templates/invoice_template/email-templates/bid_acceptance.html',
    // BID_SELECTION: 'templates/invoice_template/email-templates/bid_selection.html',
    // BID_CANCELLED: 'templates/invoice_template/email-templates/bid_cancelled.html',
    // BID_REOPENED: 'templates/invoice_template/email-templates/bid_reopened.html',
    // BID_RESUMED: 'templates/invoice_template/email-templates/bid_resumed.html',
    // BID_LEAD: 'templates/invoice_template/email-templates/bid_lead.html',
    // BULK_PO: 'templates/email_templates/bulk_po.html',
    // BULK_PO_SPRINT: 'templates/email_templates/bulk_po_sprint.html',
    // BID_PAUSED: 'templates/invoice_template/email-templates/bid_paused.html',
    // PROFILE_CHANGED: 'templates/email_templates/profile_changed.html',
    // BID_EVENT_RANK: 'templates/invoice_template/email-templates/bid_rank_updated.html',
    // SUB_USER_UPDATED: 'templates/email_templates/sub_user_updated.html',
    // REASSIGN_VENDOR: 'templates/email_templates/reassign_vendor.html'
}

exports.SMS_TEMPLATES = {
    VENDOR_ASSIGNED: 'templates/invoice_template/sms-templates/vendor_assigned.html',
    JOB_STARTED: 'templates/invoice_template/sms-templates/job_started.html',
    JOB_ENDED: 'templates/invoice_template/sms-templates/job_ended.html',
    JOB_PAUSED: 'templates/invoice_template/sms-templates/job_paused.html',
    CHANGE_ORDER_INITIATED: 'templates/invoice_template/sms-templates/change_order_initiated.html',
    GEOFENCE: 'templates/invoice_template/sms-templates/geofence.html',
    SMS_TO_FPOS_NEW_BULK_TICKET: 'templates/invoice_template/sms-templates/sms_to_fpos_new_bulk_ticket.html',
    SMS_TO_VENDOR_NEW_TICKET: 'templates/invoice_template/sms-templates/sms_to_vendor_new_ticket.html',
    BID_REMINDER: 'templates/invoice_template/sms-templates/bid_reminder.html',
    BID_NOTIFICATION: 'templates/invoice_template/sms-templates/bid_notification.html',
    NEW_APP_NOTIFICATION: 'templates/invoice_template/sms-templates/new_app.html',
}

exports.TICKET_CREATION_MODES = {
    SCRATCH: 'scratch',
    STANDARD: 'standard',
    STANDARD_PLUS_EDIT: 'standard-edit',
    CLONE: 'clone'
}


exports.project_mode_value = {
    1: 'SITE_SPECIFIC',
    2: 'NON_SITE_SPECIFIC',
    3: 'BOTH'
};

exports.project_mode = {
    'SITE_SPECIFIC': 1,
    'NON_SITE_SPECIFIC': 2,
    'BOTH': 3
};

exports.IBM_WATSON_CLASSIFIER_STATUS = {
    READY: 'ready'
}

exports.AVETTA_FLAG = {
    RED: 'Red',
    GREEN: 'Green',
    YELLOW: 'Yellow',
    AMBER: 'Amber'
};

exports.NOTIFICATION_TYPES = {
    SMS: 1,
    EMAIL: 2,
    SMS_AND_EMAIL: 3
};

exports.TIME_UNIT_TYPES = {
    MINUTES: 1,
    HOURS: 2,
    DAYS: 3
};

exports.BID_NOTIFICATION_CONDITIONS = {
    BEFORE_REVIEW_DATETIME: 1,
    BEFORE_START_DATETIME: 2,
    ON_START_DATETIME: 3,
    BEFORE_END_DATETIME: 4
};

exports.BID_EVENT_STATUS = {
    UNPUBLISHED: 1,
    OPEN: 2,
    REVIEW: 3,
    LIVE: 4,
    CANCELLED: 5,
    PAUSED: 6,
    PAST: 7,
    NOT_ASSIGNED: 8,
    AWAITING_VENDOR_CONFIRMATION: 9,
    ASSIGNED: 10
};

exports.SITE_TYPE = {
    ROOFTOP: 1,
    WATER_TANK: 2,
    TOWER: 3,
    MONOPOLE: 4
};

exports.CONSTRUCTION_TYPE = {
    NEW_BUILD: 1,
    MODIFICATION: 2,
    UPGRADE: 3
};

exports.DEFAULT_LIMIT = 25;
exports.DEFAULT_SKIP = 0;

exports.TABLES_NOT_REQUIRED = ['tb_add_on_type', 'tb_admin', 'tb_analytics', 'tb_analytics2', 'tb_appointment_field_data', 'tb_billing_history', 'tb_billing_logs', 'tb_bulk_tickets', 'tb_declined_tasks', 'tb_disable_auto_assignment', 'tb_dispatcher_permissions', 'tb_dispatcher_teams', 'tb_email_access',
    'tb_email_order_entries', 'tb_file_uploads', 'tb_financial_documents', 'tb_fleets', 'tb_fleet_crew_type', 'tb_fleet_movements', 'tb_fleet_notifications', 'tb_fleet_regions', 'tb_fleet_task_notify', 'tb_fleet_teams', 'tb_fleet_tracking', 'tb_form_settings',
    'tb_help', 'tb_invoice', 'tb_invoice_history', 'tb_invoice_templates', 'tb_jobs', 'tb_job_images', 'tb_notifications', 'tb_regions', 'tb_sample_templates', 'tb_schedules', 'tb_super_admin', 'tb_task_history', 'tb_task_session', 'tb_task_summary', 'tb_teams', 'tb_templates', 'tb_template_users', 'tb_template_variables',
    'tb_temp_routing', 'tb_tickets', 'tb_ticket_items', 'tb_transport_types', 'tb_users', 'tb_users_monthly_data', 'tb_user_add_ons', 'tb_user_billing_plan', 'tb_user_credit_card', 'tb_vendors', 'tb_vendor_fav_locations', 'tb_version', 'tb_version2', 'tb_video_call', 'tb_video_call_history', 'tb_zoho'
];

exports.DYNAMIC_TABLES_NOT_REQUIRED = ['tb_bid_zones_', 'tb_contacts_', 'tb_markets_', 'tb_region_', 'tb_sites_', 'tb_sites_contacts_',
    'tb_variation_items_', 'tb_vendor_crew_type_details_', 'tb_vendor_micro_', 'tb_variation_vendors_'
];

exports.DEFAULT_TABLES_REQUIRED = ['tb_category', 'tb_ticket_sla'];

exports.EXTRA_TABLES_REQUIRED = ['tb_sites'];

exports.DYNAMIC_TABLES_REQUIRED = ['tb_bid_zones_', 'tb_markets_', 'tb_region_', 'tb_sites_'];

exports.fetchDatabaseTables = function(database_name) {
    exports.TABLES_AVAILABLE = [];

    let fetchTablesSQL = `SELECT TABLE_NAME
       FROM information_schema.tables 
       WHERE table_schema = ? `;
    connection.query(fetchTablesSQL, [database_name], (err, tables) => {
        if (err) {
            console.log("ERROR IN FETCHING DATABASE SCHEMAS")
        } else {
            console.log("======================>>>>SETTING TABLES_AVAILABLE<<<<<<=====================");
            exports.TABLES_AVAILABLE = _.pluck(tables, 'TABLE_NAME');
        }
    })
};

exports.isVisibleStatus = {
    NO: 0,
    YES: 1
}

exports.levelTypeId = {
    MASTER_CATALOG_LEVEL: 0,
    GENRIC_ITEM_LEVEL: 1
}

exports.LIMIT_OFFSET = {
    LIMIT: 500,
    OFFSET: 0
}

exports.CONTACT_TYPE = {
    PRIMARY: 1,
    SECONDARY: 2
}

exports.BID_SETTING_MSG = {
    REBID_OVERWRITE: "Rebid overwrite not allowed.",
    VENDOR_COUNT_OVERWRITE: `Vendor count overwrite not allowed.`,
    EXTENDABLE_TIME_OVERWRITE: "Extendable time overwrite not allowed.",
    DECREMENT_PERCENT_OVERWRITE: "Decrement percentage overwrite not allowed.",
    ONGOING_PARAM_OVERWRITE: "Ongoing bid event option overwrite not allowed.",
    EXPIRATION_TIME_OVERWRITE: "Expiration time overwrite not allowed.",
    AUCTION_TYPE_OVERWRITE: "Auction type overwrite not allowed.",
    SETTING_PERMISSION: `${i18n.__('company')} setting permissions not found.`,
    EMAIL_REMINDER_SUBJECT: "SUBJECT BIDDING REMINDER",
    EMAIL_NOTIFICATION_SUBJECT: "BID EVENT NOTIFICATION",
    ALLOW_VENDORS_OVERWRITE: `Allow ${i18n.__('vendors')} overwrite not allowed.`
}

exports.BID_ACTIVITY = {
    'CREATED': 1,
    'UPDATED': 2,
    'CANCELLED': 3,
    'PAUSED': 4,
    'RESUMED': 5,
    'ASSIGNED': 6,
    'NOT_ASSIGNED': 7,
    'ACCEPTED': 8
}


exports.BID_EVENT_EMAIL_TYPE = {
    REMINDER:1,
    NOTIFICATION:2,
    PUBLISHED:3,
    CANCELLED:4,
    ADDED:5,
    REMOVED:6,
    SELECTED:7,
    ACCEPTED:8,
    RESUMED:9,
    LEAD_POSITION:10,
    UPDATED:11,
    UNSELECTED:12,
    PAUSED:13,
    BID_EVENT_RANK:14
}

exports.BID_EVENT_UPDATED_TYPE = {
    PUBLISHED:"bid_published",
    CANCELED:"bid_canceled",
    REOPENED:"bid_reopened",
    RESUMED:"bid_resumed",
    PAUSED:"bid_paused",
    SELECTED:"bid_selected",
    ACCEPTED:"bid_accepted",
    LEAD_POSITION:"bid_lead",
    ADDED:"vendor_added",
    UPDATED:"vendor_updated",
    REMOVED:"vendor_removed",
    UNSELECTED:"vendor_unassigned",
    EXTENDED:"bid_extended",
    LIVE_COUNT:"bid_live_count",
    DATE_UPDATED: "date_updated",
    PROJECT_USER_ACCESS_REVOKE: 'project_user_access_revoke',
    PROJECT_USER_ACCESS_RESTORE: 'project_user_access_restore'
}

exports.FORM_FIELDS = ['region', 'market', 'bid_zone', 'site_id', 'schedule_start', 'due_date_hours']

exports.SPRINT_FORM_FIELDS = [
	'quote_expiration_date',
	'supplier_contact_name',
	'supplier_phone_number',
	'supplier_quote_number',
	'supplier_mcsa_#',
	'sprint_contact_name',
	'sprint_phone_number',
	'supplier_submitter_name',
	'supplier_submitter_title'
];

exports.BID_SOCKET_EVENT = {
    BID_EVENT_UPDATED: "bid_event_updated",
    BID_EVENT_REMOVED: "bid_event_removed",
    BID_EVENT_RANK:"bid_event_rank",
    BID_EVENT_BEST_BIDDER:"bid_event_best_bidder"
}

exports.AUDIT_QUALITY = {
	TOTAL_WEIGHTAGE: 100,
	SCORE_TYPE: {
		"COMPANY": 1,
		"VENDOR": 2
	},
	ENTITY: {
		"COMPANY": 1,
		"VENDOR": 2
	},
	MODE_SETTINGS: {
		"SIMPLE": 1,
		"ADVANCE": 2
	},
	RATING_SCALE_TYPE: {
		"NEGATIVE": 0,
		"POSITIVE": 1
	},
	OPTION_SETTINGS: {
		"NO": 0,
		"YES": 1,
		"READ": 2,
		"READ_WRITE": 3,
		"HIDE": 4
	},
	LEVEL: {
		"PROGRAM": 1,
		"TICKET": 2,
	},
	AUDIT_SCALE: {
		"FIVE": 5,
		"SEVEN": 7,
		"TEN": 10,
	},
	CRITERIA: {
		"FIVE": [
			{
				rating_point: 1,
				short_name: "Worst",
				description: "Worst",
			}, {
				rating_point: 2,
				short_name: "Poor",
				description: "Poor",
			}, {
				rating_point: 3,
				short_name: "Average",
				description: "Average",
			}, {
				rating_point: 4,
				short_name: "Good",
				description: "Good",
			}, {
				rating_point: 5,
				short_name: "Excellent",
				description: "Excellent",
			}
		],
		"SEVEN": [
			{
				rating_point: 1,
				short_name: "Worst",
				description: "Worst",
			},
			{
				rating_point: 2,
				short_name: "Bad",
				description: "Bad",
			}, {
				rating_point: 3,
				short_name: "Poor",
				description: "Poor",
			}, {
				rating_point: 4,
				short_name: "Average",
				description: "Average",
			}, {
				rating_point: 5,
				short_name: "Good",
				description: "Good",
			}, {
				rating_point: 6,
				short_name: "Great",
				description: "Great",
			}, {
				rating_point: 7,
				short_name: "Excellent",
				description: "Excellent",
			}
		],
		"TEN": [
			{
				rating_point: 1,
				short_name: "Worst",
				description: "Worst",
			}, {
				rating_point: 2,
				short_name: "Bad",
				description: "Bad",
			}, {
				rating_point: 3,
				short_name: "Poor",
				description: "Poor",
			}, {
				rating_point: 4,
				short_name: "Below Average",
				description: "Below Average",
			}, {
				rating_point: 5,
				short_name: "Average",
				description: "Average",
			}, {
				rating_point: 6,
				short_name: "Above Average",
				description: "Above Average",
			}, {
				rating_point: 7,
				short_name: "Good",
				description: "Good",
			}, {
				rating_point: 8,
				short_name: "Very Good",
				description: "Very Good",
			}, {
				rating_point: 9,
				short_name: "Excellent",
				description: "Excellent",
			}, {
				rating_point: 10,
				short_name: "Fabulous",
				description: "Fabulous",
			}
		]
	},
};

exports.PROGRAM_LEVEL_SETTINGS = {
	questionnaire: [{
		question: i18n.__("vendor's")+" permission to access " + i18n.__("company's") +" audit quality score",
		question_order:1,
		question_options: [
			exports.AUDIT_QUALITY.OPTION_SETTINGS["READ"],
			exports.AUDIT_QUALITY.OPTION_SETTINGS["READ_WRITE"],
			exports.AUDIT_QUALITY.OPTION_SETTINGS["HIDE"],
		],
		value: exports.AUDIT_QUALITY.OPTION_SETTINGS["HIDE"],
	}, {
		question: `Allow ${i18n.__('vendor')} to put their own audit quality score`,
		question_order:2,
		question_options: [
			exports.AUDIT_QUALITY.OPTION_SETTINGS["YES"],
			exports.AUDIT_QUALITY.OPTION_SETTINGS["NO"],
		],
		value: exports.AUDIT_QUALITY.OPTION_SETTINGS["NO"]
	}, {
		question: "Allow auditor to view the weights to each question (Applicable for Advance mode only)",
		question_order:3,
		question_options: [
			exports.AUDIT_QUALITY.OPTION_SETTINGS["YES"],
			exports.AUDIT_QUALITY.OPTION_SETTINGS["NO"],
		],
		value: exports.AUDIT_QUALITY.OPTION_SETTINGS["NO"]
	}, {
		question: "Allow all user to download or share audit quality details (Applicable for Advance mode only)",
		question_order:4,
		question_options: [
			exports.AUDIT_QUALITY.OPTION_SETTINGS["YES"],
			exports.AUDIT_QUALITY.OPTION_SETTINGS["NO"],
		],
		value: exports.AUDIT_QUALITY.OPTION_SETTINGS["NO"]
	}]
};

exports.BID_EVENT_SOCKET_MESSAGE = {
    PUBLISH:`${i18n.__('company')} {{{name}}} has published a new bid event {{{title}}}.`,
    UPDATE:`${i18n.__('company')} {{{name}}} has updated the bid event {{{title}}}.`,
    CANCEL:`${i18n.__('company')} {{{name}}} has cancelled the bid event {{{title}}}.`,
    REOPEN:`${i18n.__('company')} {{{name}}} has reopened the bid event {{{title}}}.`,
    REMOVE:`${i18n.__('company')} {{{name}}} has removed you from the bid event {{{title}}}.`,
    ACCEPT:`${i18n.__('vendor')} {{{name}}} has accepted the bid event {{{title}}}.`,
    SELECT:`Congratulations! ${i18n.__('company')} {{{name}}} has selected you in the bid event {{{title}}} for the program {{{program_name}}}.`,
    RESUME:`${i18n.__('company')} {{{name}}} has resumed the bid event {{{title}}}.`,
    PAUSED:`${i18n.__('company')} {{{name}}} has paused the bid event {{{title}}}.`,
    LEAD:"You have just lost the leading position for the bid event {{{title}}}.",
    ADDED:`${i18n.__('company')} {{{name}}} has added you in the bid event - {{{title}}} for the program - {{{program_name}}}.`,
    EXTENDED:"Bid event {{{title}}} will end at {{{extendable_datetime}}}.",
    UNSELECT:`${i18n.__('company')} {{{name}}} has reassigned the bid event - {{{title}}} for the program - {{{program_name}}} to some other ${i18n.__('vendor').toLowerCase()}.`
}

exports.BID_EVENT_CSV_ERROR = {
    CSV_ERROR:"Invalid Csv Errors.",
    LOT_ERROR : "Lot name cannot be changed.",
    CONTRACT_ERROR:"Contract ID cannot be changed.",
    LINE_ITEM_NAME_ERROR:"Line Item Details cannot be changed.",
    LINE_ITEM_ID_ERROR:"Line item ID cannot be changed.",
    QUANTITY_ERROR:"Quantity cannot be changed.",
    CATALOG_PRICE_ERROR:`${i18n.__('catalog')} Unit Price cannot be changed.`,
    CURRENT_SAVED_BID_ERROR:"Current Saved Bid cannot be changed.",
    LAST_PROPOSED_BID_ERROR:"Last Proposed Bid cannot be changed.",
    PROPOSE_BID_ERROR:"Invalid Proposed Bid.",
    CATALOG_PRICE_CHECK:`Proposed bid should be less than ${i18n.__('catalog')} price.`,
    EXTRA_FIELD_ERROR :"Extra line item can not be added.",
    LESS_FIELD_ERROR : "No record should be deleted.",
    HEADER_LENGTH_ERROR: "Header Column missmatch in csv." ,
    HEADER_COLUMN_MISSING: "Header Column missing in csv." ,
    INVALID_HEADER_COLUMN: "Invalid Header Column in csv.",
    VALID_LAST_PROPOSED_BID_ERROR: "Each line item proposed bid can not be greater than last bid.",
    NEGATIVE_PROPOSED_BID_ERROR : "Proposed bid can not be negative.",
    SITE_ERROR:"Site ID can not be changed.",
    REGION_ERROR:"Region can not be changed.",
    MARKET_ERROR:"Market can not be changed.",
    BIDZONE_ERROR:"Bidzone can not be changed."
}


exports.USER_TYPE_ID = {
    // buyer
    COMPANY: 1, // tb_companies
    COMPANY_USER: 4,  //tb_role_user
    SUB_COMPANY: 5, // tb_sub_companies

    // supplier
    VENDOR: 2, // tb_users
    SUB_VENDOR: 6, // tb_sub_users

    //agent
    FLEET: 3, // tb_fleets
};

exports.USER_TYPE_TABLES = {
    COMPANY: 'tb_companies',
    VENDOR: 'tb_users',
    FLEET: 'tb_fleets',
    COMPANY_USER: 'tb_role_user',
    SUB_COMPANY: 'tb_sub_companies',
    SUB_VENDOR: 'tb_sub_users',
    ADMIN : 'tb_super_admin'
}

exports.COMPANY_AGGREMENT_DOC = {
    ON : 1,
    OFF : 0
};

exports.DOC_DETAILS = {
    SERVER_ADMIN : 0,
    COMPANY : 1,
    ACTIVE:1,
    NOT_ACTIVE:0,
    DRAFT : 0,
    PUBLISH : 1,

    BUYER_APPLICABLE : 1,
    SUPPLIER_APPLICABLE : 2

};


exports.AGREEMENT_DOC_SOCKET_EVENT = {
    AGREEMENT_DOC_CHANGED: 'agreement_doc_changed'
}

exports.AGREEMENT_DOC_SOCKET_MESSAGE = {
    AGREEMENT_DOC_CHANGED: 'A new version of End User License agreement is available'
}


exports.WORKFLOW_OPERAND_TYPE = {
    "submission": "submission_date",
    "approval": "approval_date",
    "rejection": "rejection_date",
    "approval_count":"approval_count",
    "submission_count":"submission_count",
    "rejection_count":"rejection_count"
};


exports.MODULES = {
    'BIDDING': 'Bidding',
    'SUB_USERS': 'Sub Users',
    'CHANGE_ORDER': 'Change Order',
    'BID_NOTIFICATIONS': 'Bid Notifications',
    'TICKETS': 'Tickets'
};

exports.TICKET_BID_EVENT_ACTIVITY_DESCRIPTIONS = {
	CREATED: `Added to bid event bid_title by company_user_name.`,
	PUBLISHED: `Bid event published.`,
	STARTED: `Bid event started.`,
	ENDED: `Bid event ended.`,
	AWARDED: `Bid event awarded by company_user_name.`,
	ACCEPTED: `Bid event accepted by vendor_user_name.`,
	REMOVED: `Removed from bid event bid_title by company_user_name.`
};

exports.FILE_TYPE = {
	CSV: 1,
	EXCEL: 2,
	PDF: 3
};

exports.CHANGE_ORDER_TYPE = {
	PO: 1,
	POR: 2,
	INVOICE: 3
};

exports.CHANGE_ORDER_TYPE_VALUE = {
	1: 'PO',
	2: 'POR',
	3: 'INVOICE'
};

exports.CHANGE_ORDER_ACTION_TYPE = {
	REJECTED: 1,
	CANCELLED: 2,
	APPROVED: 3
};

exports.CHANGE_ORDER_ACTION_TYPE_VALUE = {
	1: 'REJECTED',
	2: 'CANCELLED',
	3: 'APPROVED',
};
exports.CHANGE_ORDER_REQUESTED = {
    YES: 1,
    NO: 0
};
exports.CURRENT_BILLING_STATUS = {
    PR_PENDING_CLIENT_APPROVAL: 0,
    PR_PENDING_VENDOR_APPROVAL: 1,
    PO_ISSUED: 2,
    INVOICE_PENDING_APPROVAL: 3,
    INVOICE_APPROVED: 4
};

exports.POR_ACTION_TYPE = {
    DOWNLOAD_PO_ONLY: 1,
    DOWNLOAD_ALL_WITH_LATEST_PO: 2
};

exports.CONTRACT_TEMPLATE_TYPE = {
	WORK_TYPE : {
		"CONSTRUCTION": "Construction",
		"ACQUISITION": "Acquisition",
		"MAINTENANCE": "Maintenance"
	},
	"TICKET_ACCEPTANCE_STATUS": {
		"YES": {
			"VALUE": 1,
			"MESSAGE": "ACCEPTED"
		},
		"NO": {
			"VALUE": 0,
			"MESSAGE": "NOT ACCEPTED"
		}
	}
};

exports.BID_EVENT_AUCTION_TYPE = {
    REVERSE_AUCTION:1,
    FORWARD_AUCTION:2,
    BOTH:3
}

exports.TICKET_ASSIGN_MODE = {
    AUTO: 'auto',
    MANUAL: 'manual',
    NEAREST: 'nearest',
    BID: 'bid'
}

exports.APPROVAL_CODES = {
    UNDER_REVIEW: 1,
    APPROVED: 2,
    REJECTED: 3,
    BLOCKED: 4,
    DELETED: 5,
}

exports.APPROVAL_STATUSES = {
    1: {
        MESSAGE_KEY: 'UNDER_REVIEW',
        TEXT: 'Under Review'
    },
    2: {
        MESSAGE_KEY: 'USER_APPROVED',
        TEXT: 'Approved'
    },
    3: {
        MESSAGE_KEY: 'USER_REJECTED',
        TEXT: 'Rejected'
    },
    4: {
        MESSAGE_KEY: 'USER_BLOCKED',
        TEXT: 'Blocked'
    },
    5: {
        MESSAGE_KEY: 'USER_DELETED',
        TEXT: 'Deleted'
    },
}

exports.USER_PROFILE_STATUS_SOCKET = {
    PROFILE_CHANGED: 'user_profile_changed'
}

exports.USER_PROFILE_STATUS_SOCKET_MESSAGE = {
    UNDER_REVIEW: 'Your profile is under review. <br> Please contact the administrator for further updates.',
    USER_APPROVED: 'Your account profile has been approved.',
    USER_REJECTED: 'Your account approval has been rejected. <br> Please contact the administrator for the reason.',
    USER_BLOCKED: 'Administrator has blocked your account access. Please contact the administrator.',
    USER_DELETED: 'Your account has been deleted by administrator. Please contact the administrator.'
}

exports.USER_PROFILE_STATUS_EMAIL_MESSAGE = {
    UNDER_REVIEW: 'Your profile is under review. Please contact the administrator for further updates.',
    USER_APPROVED: 'Your account profile has been approved.',
    USER_REJECTED: 'Your account approval has been rejected. Please contact the administrator for the reason.',
    USER_BLOCKED: 'Administrator has blocked your account access. Please contact the administrator.',
    USER_DELETED: 'Your account has been deleted by administrator. Please contact the administrator.'
}

exports.DATA_FILTERS = {
	"TEXT": {
		"EQUALS": "Text Equals",
		"DOES_NOT_EQUALS": "Text Does Not Equals",
		"BEGINS_WITH": "Begins With",
		"ENDS_WITH": "Ends With",
		"CONTAINS": "Contains",
		"DOES_NOT_CONTAINS": "Does Not Contains"
	},
	"NUMBER": {
		"EQUALS" : "Number Equals",
		"DOES_NOT_EQUALS" : "Number Does Not Equals",
		"GREATER_THAN" : "Greater Than",
		"LESS_THAN" : "Less Than",
		"GREATER_THAN_EQUALS_TO" : "Greater Than Or Equals To",
		"LESS_THAN_OR_EQUALS_TO" : "Less Than Or Equals To",
		"AVERAGE" : "Average",
		"ABOVE_AVERAGE" : "Above Average",
		"BELOW_AVERAGE" : "Below Average",
        "CONTAINS": "Contains"
	},
	"DATE": {
		"EQUALS" : "Date Equals",
		"BEFORE" : "Before",
		"AFTER" : "After",
		"BETWEEN" : "Between",
		"TODAY" : "Today",
		"YESTERDAY" : "Yesterday",
		"NEXT_WEEK" : "Next Week",
		"THIS_WEEK" : "This Week",
		"LAST_WEEK" : "Last Week",
		"NEXT_MONTH" : "Next Month",
		"THIS_MONTH" : "This Month",
		"LAST_MONTH" : "Last Month",
		"NEXT_QUARTER" : "Next Quarter",
		"THIS_QUARTER" : "This Quarter",
		"LAST_QUARTER" : "Last Quarter",
		"NEXT_YEAR" : "Next Year",
		"THIS_YEAR" : "This Year",
		"LAST_YEAR" : "Last Year",
		"YEAR_TO_DATE": "Year To Date"
	},
	"DATA_TYPE": {
		"PDF": "PDF",
		"EXCEL": "EXCEL",
		"DATA": "DATA"
	}
};

exports.default_date = '0000-00-00 00:00:00';
exports.NA = 'N.A.';

exports.NON_PO_ITEMS_PO_NAME = 'Extra item';
exports.MISC_ITEMS_PO_NAME = 'Extra - Misc Item';
exports.MISC_OTHER_ITEMS_PO_NAME = 'Extra - Misc(other) Item';

exports.SUB_USER_EMAIL_TYPE = {
    UPDATED:1,
    DELETED:2
}

exports.BID_EVENT_AUCTION_TYPE_VALUE = {
    1: `Reverse Auction`,
    2: `Forward Auction`,
    3: `Both`
}

exports.EMAIL_CONSTANTS = {
    ACCESS_REVOKED_TEXT:"Your access has been revoked from ",
    ACCESS_REVOKED_SUBJECT:'Access revoked',
    BRAND_NAME:"Scopeworker"
}

exports.QUOTE_EXPIRATION_TIME = 60;



exports.WEBHOOK_NOTIFICATION_TYPES = {
    ARIBA: 1,
    GENERAL_ITEMS: 2,
    VARIATION_ITEMS: 3,
    BULK_PO: 4,
    VARIATION_VENDORS: 5,
    SITES: 6,
    EULA: 7,
    TICKETS: 8,
    APPROVALS: 9 ,
    ANNOUNCEMENT_FEATURE: 10
};

exports.NOTIFICATION_STATUS = {
    PENDING: 0,
    FAILED: 1,
    SUCCESS: 2
};

exports.FILE_NOTIFICATION_TYPE = {
    COMPANY_CODES:'COMPANY_CODES',
    PLANT: 'PLANT',
    SHIP_TO_PARTY: 'SHIP_TO_PARTY',
    BILL_TO_PARTY: 'BILL_TO_PARTY',
    VENDORS: 'VENDORS',
    VENDOR_UPDATE: 'VENDOR_UPDATE',
    USERS:'USERS',
    USER_UPDATE: 'USER_UPDATE',
    COST_CENTERS: 'COST_CENTERS',
    GL_ACCOUNTS: 'GL_ACCOUNTS',
    COMMODITY_MAPPINGS: 'COMMODITY_MAPPINGS',
    UNSPC_MASTER_CODES:'UNSPC_MASTER_CODES',
    WBS_ELEMENTS:'WBS_ELEMENTS',
    VARIATION_ITEMS:'VARIATION_ITEMS',
    VARIATION_VENDORS:'VARIATION_VENDORS',
    SITES: 'SITES'
};




exports.MASTER_FILE_EVENT = {
	UPLOAD_SUCCESS: 0,
	UPLOAD_ERROR: 1,
	DOWNLOAD_SUCCESS: 2,
	DOWNLOAD_ERROR: 3
}


// // ADMIN_ADDONS and ADMIN_ADDONS_TYPES keys should match
// exports.ADMIN_ADDONS = {
// 	ARIBA: true
// }


// list of all admin addons available in the system and their types
// ADMIN_ADDONS and ADMIN_ADDONS_TYPES keys should match
exports.ADMIN_ADDONS_TYPES = {
	ARIBA: 0,
    MILESTONE: 1
}

exports.fetchAdminConstants = function(domain) {
	exports.ADMIN_ADDONS = {};

    let fetchTablesSQL = `
		SELECT taa.type, taa.is_active
   		FROM tb_admin_addons taa
		WHERE taa.domain = ?
   	`;
    connection.query(fetchTablesSQL, [domain], (err, addons) => {
        if (err) {
            console.log("ERROR IN FETCHING ADDONS")
        } else {
            console.log("======================>>>>ADDONS AVAILABLE<<<<<<=====================");
            const invertedAddonTypes = _.invert(exports.ADMIN_ADDONS_TYPES);

            _.each(addons, (addon) => {
            	const addonName = invertedAddonTypes[addon.type];
            	const isActive = addon.is_active === 1;
            	 exports.ADMIN_ADDONS[addonName] = isActive;
            });
        }
    });
};

exports.fetchCompanyAddonConfiguration = function() {
    exports.COMPANY_ADDON_CONFIGURATION = {};

    let sql = `SELECT tca.company_id, tca.is_active, tca.addon_id, tcat.name FROM tb_company_addons tca
    INNER JOIN tb_company_addon_types tcat ON tcat.id = tca.addon_id`;
    connection.query(sql, [], (err, data) => {
        if (err) {
            console.log("ERROR IN FETCHING COMPANY ADDON CONFIGURATION")
        } else {
            console.log("======================>>>>COMPANY ADDON CONFIGURATION AVAILABLE<<<<<<=====================");
            let companyIds = _.uniq(_.pluck(data, 'company_id'));

            let index = 0;
            getCompanyAddons(index);
            function changeIndex() {
                index++;
                return getCompanyAddons(index);
            }

            function getCompanyAddons(i) {
                if (i < companyIds.length) {
                    (function (i) {
                        let company_addons = _.where(data, {company_id: companyIds[i]});
                        let addonObj = {};
                        _.each(company_addons, (ele) => {
                            addonObj[ele.name] = ele.is_active
                        });

                        exports.COMPANY_ADDON_CONFIGURATION[companyIds[i]] = addonObj;
                        changeIndex();
                    })(i);
                } else {
                    return exports.COMPANY_ADDON_CONFIGURATION;
                }
            }
        }
    });
};

exports.fetchServerAddonConfiguration = function() {
    exports.SERVER_ADDON_CONFIGURATION = {};

    let sql = `
        SELECT tsa.name, tsa.is_active
        FROM tb_server_addons tsa
        WHERE 1
    `;
    connection.query(sql, [], (err, data) => {
        if (err) {
            console.log("ERROR IN FETCHING SERVER ADDON CONFIGURATION")
        } else {
            console.log("======================>>>>SERVER ADDON CONFIGURATION AVAILABLE<<<<<<=====================");

            const addons = {};
            _.each(data, addon => {
                addons[addon.name] = addon.is_active;
            })
            exports.SERVER_ADDON_CONFIGURATION = addons;
            
        }
    });
};

exports.FILE_TYPE_VALUE = {
	1: 'CSV',
	2: 'EXCEL',
	3: 'PDF'
};


exports.RAW_FORMAT_LABEL = '$$USE_RAW_FORMAT$$';

exports.FRONTEND_CLIENTS = ['company', 'vendor', 'admin', 'tracking'];

exports.AWARD_TYPE = {
	GEOLOCATION: 1,
	NON_TRACKING: 2
};

exports.AWARD_TYPE_VALUE = {
	1: 'Tracking',
	2: 'Non Tracking'
};

exports.VENDOR_COMPLETING_TICKET_SOCKETS = {
    REASSIGN_VENDOR: 'reassing_vendor'
};

exports.TASK_HISTORY_MESSAGES = {
	TASK_ASSIGNMENT: 'Assigned the task',
	TASK_ACCEPTANCE: 'Accepted the task',
	TASK_REASSIGNMENT: 'username_1 has assigned this task to username_2',
	TASK_ARRIVED: 'Arrived at',
	TASK_FAILED: 'Failed at',
	TASK_ON_HOLD: 'Status changed to job_status from last_job_status',
	TASK_ENDED_BY_VENDOR: 'Successful at',
};

exports.AWARD_TYPE_ASSIGNEE = {
	AGENT: '(A)',
	VENDOR: `(${i18n.__('V')})`
};


exports.MILESTONE_FEATURE_STATUS = {
    OFF: 0,
    ON: 1,
    OFF_FOR_NEW_CONTRACT: 2
};

exports.MILESTONE_REQUIERD_STATUS = {
    OPTIONAL: 0,
    REQUIRED: 1
};

exports.MILESTONES_DATE_FORMAT = {
    DATETIME: 1,
    DATE: 2
};

exports.MILESTONE_PREFIX = {
    CONTRACT: 'CM',
    PROJECT: 'PJ',
    PROGRAM: 'PG'
};


// server addons
exports.SERVER_ADDONS = {
    AVETTA: 'AVETTA'
}
exports.AUTH_SERVICE_DELETION_TYPE = {
	SOFT: 'soft',
	HARD: 'hard'
}


exports.APP_TYPE = {
    CUSTOMER: 1,
    DRIVER: 2
}

exports.DEVICE_TYPE = {
    ANDROID: 1,
    IOS: 2
}


exports.USER_TYPE = {
    CUSTOMER: 1,
    DRIVER: 2,
    ADMIN: 3
}

