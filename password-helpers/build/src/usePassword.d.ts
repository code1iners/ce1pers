/** Props interface. */
interface IUsePasswordProps {
    /** Generated password length. */
    passwordLength?: number;
    /** Include number characters. */
    useNumbers: boolean;
    /** Include symbol characters. */
    useSymbols: boolean;
    /** Include lowercase characters. */
    useLowercase: boolean;
    /** Include uppercase characters. */
    useUppercase: boolean;
}
/**
 * Random password generator.
 */
export declare const usePassword: ({ passwordLength, useNumbers, useSymbols, useLowercase, useUppercase, }: IUsePasswordProps) => {
    generate: () => {
        ok: boolean;
        error: {
            code: string;
            message: string;
        };
        data?: undefined;
    } | {
        ok: boolean;
        data: string;
        error?: undefined;
    };
};
export {};
