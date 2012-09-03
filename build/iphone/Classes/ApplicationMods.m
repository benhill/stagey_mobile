#import "ApplicationMods.h"

@implementation ApplicationMods

+ (NSArray*) compiledMods
{
	NSMutableArray *modules = [NSMutableArray array];
	[modules addObject:[NSDictionary dictionaryWithObjectsAndKeys:@"sharekit",@"name",@"com.0x82.sharekit",@"moduleid",@"3.0",@"version",@"21503f84-4fa6-494e-b371-39503c047db3",@"guid",@"",@"licensekey",nil]];
	return modules;
}

@end
