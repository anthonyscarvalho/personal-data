export enum RESPONSE_CODE {
	InvalidAudienceType = 100,
	InvalidAudienceIdentifier = 101,
	InvalidAudienceDemographic = 102,
	MissingAudienceValues = 103,
	VisibilityDateRangesIncorrect = 200,
	InvalidVisibilityDirectiveSpecified = 201,
	BothVisibilityDatesAreInThePast = 202,
	InvalidVisibilityWeightingSpecified = 203,
	ClickLimitMayNotExceedViewLimit = 204,
	InvalidClickLimitValueProvided = 205,
	InvalidViewLimitValueProvided = 206,
	MissingTemplateType = 301,
	MissingValueInTemplatePayload = 302,
	InvalidValueInTemplatePayload = 303,
	ApiSubmissionLimitRestrictions = 900,
	DuplicateSubmission = 901,
	FeedEngineUnavailable = 902,
	Unauthenticated = 903,
	ForbiddenValueDefined = 904,
	FeedItemNotFoundForDeletion = 905,
	FeedItemNotFoundForEditing = 906,
	TemplateTypeForbidden = 907,
}