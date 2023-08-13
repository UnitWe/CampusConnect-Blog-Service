import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ObjectId } from 'mongodb';

export function IsObjectId(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
        registerDecorator({
            name: 'isObjectId',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!value || typeof value !== 'string') {
                        return false;
                    }

                    return ObjectId.isValid(value);
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} deve ser um Id válido.`;
                },
            },
        });
    };
}
