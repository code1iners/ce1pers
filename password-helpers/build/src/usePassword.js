"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usePassword = void 0;
/**
 * Selects an index from a character set with cryptographically secure randomness.
 */
const getSecureRandomIndex = (length) => {
    /** Browser or Node Web Crypto implementation. */
    const crypto = globalThis.crypto;
    if (!(crypto === null || crypto === void 0 ? void 0 : crypto.getRandomValues)) {
        throw new Error("Web Crypto API is not supported.");
    }
    /** One 32-bit value used for each character selection. */
    const randomBuffer = new Uint32Array(1);
    /** Rejection boundary that removes modulo bias. */
    const unbiasedLimit = Math.floor(0x100000000 / length) * length;
    // Reject the remainder range so every character has the same probability.
    do {
        crypto.getRandomValues(randomBuffer);
    } while (randomBuffer[0] >= unbiasedLimit);
    return randomBuffer[0] % length;
};
/**
 * Random password generator.
 */
const usePassword = ({ passwordLength = 20, useNumbers, useSymbols, useLowercase, useUppercase, }) => {
    /** Number characters available to the generator. */
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    /** Symbol characters available to the generator. */
    const symbols = ["@", "#", "$", "%"];
    /** Character codes used to create lowercase letters. */
    const charCode = Array.from(Array(26)).map((_, index) => index + 97);
    /** Lowercase letters available to the generator. */
    const lowercaseLetters = charCode.map((char) => String.fromCharCode(char));
    /** Uppercase letters available to the generator. */
    const uppercaseLetters = lowercaseLetters.map((char) => char.toUpperCase());
    /**
     * Generates a password while preserving the existing result shape.
     */
    const generate = () => {
        // Validate length before allocating or generating any characters.
        if (typeof passwordLength !== "number" ||
            !Number.isSafeInteger(passwordLength) ||
            passwordLength < 1) {
            return {
                ok: false,
                error: {
                    code: "0001",
                    message: "passwordLength parameter must be a positive safe integer.",
                },
            };
        }
        // Check useNumbers parameter.
        if (typeof useNumbers !== "boolean")
            return {
                ok: false,
                error: {
                    code: "0002",
                    message: "useNumbers parameter must be boolean type.",
                },
            };
        // Check useSymbols parameter.
        if (typeof useSymbols !== "boolean")
            return {
                ok: false,
                error: {
                    code: "0003",
                    message: "useSymbols parameter must be boolean type.",
                },
            };
        // Check useLowercase parameter.
        if (typeof useLowercase !== "boolean")
            return {
                ok: false,
                error: {
                    code: "0004",
                    message: "useLowercase parameter must be boolean type.",
                },
            };
        // Check useUppercase parameter.
        if (typeof useUppercase !== "boolean")
            return {
                ok: false,
                error: {
                    code: "0005",
                    message: "useUppercase parameter must be boolean type.",
                },
            };
        /** Characters selected by the caller's inclusion flags. */
        const availableCharacters = [
            ...(useNumbers ? numbers : []),
            ...(useSymbols ? symbols : []),
            ...(useLowercase ? lowercaseLetters : []),
            ...(useUppercase ? uppercaseLetters : []),
        ];
        // Check has include condition.
        if (!availableCharacters.length) {
            return {
                ok: false,
                error: {
                    code: "0006",
                    message: "Must choose one of include condition.",
                },
            };
        }
        /** Password characters accumulated during generation. */
        let password = "";
        try {
            for (let index = 0; index < passwordLength; index += 1) {
                // Use Web Crypto rather than Math.random for every character choice.
                const randomIndex = getSecureRandomIndex(availableCharacters.length);
                password += availableCharacters[randomIndex];
            }
        }
        catch (error) {
            /** Web Crypto support failure exposed through the existing result contract. */
            const cryptoError = {
                code: "0007",
                message: error.message,
            };
            return {
                ok: false,
                error: cryptoError,
            };
        }
        return {
            ok: true,
            data: password,
        };
    };
    return {
        generate,
    };
};
exports.usePassword = usePassword;
