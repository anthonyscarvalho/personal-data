export enum PROFILE_BODY_TYPE {
	anorexic = 0,
	athletic = 1,
	average = 2,
	buff = 3,
	extremelyObese = 4,
	fat = 5,
	hourglass = 6,
	pearShaped = 7,
	petite = 8,
	pudgy = 9,
	sexToy = 10
}

export const PROFILE_BODY_TYPE_MAPPING: Record<PROFILE_BODY_TYPE, string> = {
	[PROFILE_BODY_TYPE.anorexic]: 'Extremely thin with no bodily mass',
	[PROFILE_BODY_TYPE.athletic]: 'Muscular attributes can be seen amd fit.',
	[PROFILE_BODY_TYPE.average]: 'While most of the GGG Models are slim figure, some are more defined by being thin, slender models.  These are the more runway model types, generally leggy and slender types.',
	[PROFILE_BODY_TYPE.buff]: 'We use this description for models that are thin but have a more muscular definition,  or usually more curvaceous figures.',
	[PROFILE_BODY_TYPE.extremelyObese]: 'Self explanatory.',
	[PROFILE_BODY_TYPE.fat]: 'This will be reserved for the more plus sized type models.  There aren’t many that fit this description in the GGG films but there are a few beautiful bigger models that have graced the JT movies.',
	[PROFILE_BODY_TYPE.hourglass]: 'Has a body shape that looks like a hour glass. Wide shoulders, thin waste and broad hips.',
	[PROFILE_BODY_TYPE.pearShaped]: 'Has a body shape that looks like a pear. narrow shoulders, average waste and broad hips.',
	[PROFILE_BODY_TYPE.petite]: 'Smaller than normal body but not thin.',
	[PROFILE_BODY_TYPE.pudgy]: 'Slightly overweight.',
	[PROFILE_BODY_TYPE.sexToy]: 'This is reserved for women C-cup sized breasts or larger…they deserve a classification of their own regardless of body shape!',
};

export const PROFILE_BODY_TYPE_IMAGE_MAPPING: Record<PROFILE_BODY_TYPE, string> = {
	[PROFILE_BODY_TYPE.anorexic]: 'body-type_anorexic.png',
	[PROFILE_BODY_TYPE.athletic]: 'body-type_athletic.png',
	[PROFILE_BODY_TYPE.average]: 'body-type_average.png',
	[PROFILE_BODY_TYPE.buff]: 'body-type_buff.png',
	[PROFILE_BODY_TYPE.extremelyObese]: 'body-type_extremely-obese.png',
	[PROFILE_BODY_TYPE.fat]: 'body-type_fat.png',
	[PROFILE_BODY_TYPE.hourglass]: 'body-type_hourglass.png',
	[PROFILE_BODY_TYPE.pearShaped]: 'body-type_pear-shaped.png',
	[PROFILE_BODY_TYPE.petite]: 'body-type_petite.png',
	[PROFILE_BODY_TYPE.pudgy]: 'body-type_pudgy.png',
	[PROFILE_BODY_TYPE.sexToy]: 'body-type_sex-toy.png',
};
