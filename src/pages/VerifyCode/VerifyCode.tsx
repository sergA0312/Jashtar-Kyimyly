import React, { useState, useRef, useEffect } from "react";
import styles from "./VerifyCode.module.scss";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordStore } from "@/app/store/auth/ForgotPassword";
import authimage from "@/shared/assets/images/authImage.png";

export function VerifyCode() {
    const CODE_LENGTH = 4;
    const [code, setCode] = useState<string[]>(Array(CODE_LENGTH).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
    const navigate = useNavigate();
    const [codeToken, setCodeToken] = useState("");

    const { verifyToken, loading, error, success } = useForgotPasswordStore();

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return;
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);

        if (value && index < CODE_LENGTH - 1) {
            inputsRef.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = code.join("");

        if (token.length !== CODE_LENGTH) {
            alert(`Код должен содержать ${CODE_LENGTH} цифры`);
            return;
        }

        setCodeToken(token);
        await verifyToken({ token });
    };

    // ✅ Перенесли навигацию в useEffect
    useEffect(() => {
        if (success && codeToken) {
            useForgotPasswordStore.getState().logout();
            navigate(`/new-password/${codeToken}`);
        }
    }, [success, codeToken, navigate]);

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h1 className={styles.title}>Введите код подтверждения</h1>
                <p className={styles.subtitle}>
                    Код был отправлен на ваш email.
                </p>

                <div className={styles.codeInputs}>
                    {code.map((digit, index) => (
                        <input
                            key={index}
                            ref={(el) => { inputsRef.current[index] = el; }}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className={styles.codeInput}
                        />
                    ))}
                </div>

                <button type="submit" className={styles.submitButton} disabled={loading}>
                    {loading ? "Проверяем..." : "Продолжить"}
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>Успешная верификация!</p>}
            </form>
            <img src={authimage} alt="Auth" />
        </div>
    );
}
