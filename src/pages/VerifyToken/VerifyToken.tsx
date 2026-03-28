import React, { useState } from "react";
import styles from "./VerifyToken.module.scss";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeOffIcon, MailIcon } from "lucide-react";
import authimage from "@/shared/assets/images/authImage.png";
import { useVerifyStore } from "@/app/store/auth/Verify";

interface FormData {
    uid: string;
    token: string;
}

export function VerifyToken() {
    const [formData, setFormData] = useState<FormData>({
        uid: "",
        token: "",
    });
    const navigate = useNavigate();
    const [visibletokens, setVisibletokens] = useState({
        token: false,
    });

    const { verify, loading, error, success } = useVerifyStore();

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggletokenVisibility = () => {
        setVisibletokens((prev) => ({ ...prev, token: !prev.token }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors: string[] = [];

        if (formData.token.length < 6) {
            errors.push("Код должен содержать минимум 6 символов");
        }

        if (errors.length > 0) {
            alert("Ошибки в форме:\n" + errors.join("\n"));
            return;
        }

        await verify({
            uid: Number(formData.uid), // ⚠️ если сервер ждёт число, иначе оставь строкой
            token: formData.token,
        });
    };

    if (success) {
        navigate("/profile");
    }

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <h1 className={styles.title}>Добро пожаловать!</h1>
                <p className={styles.subtitle}>
                    Код подтверждения и ваш UID были отправлены на ваш email.
                </p>

                {/* uid */}
                <div className={`${styles.fieldContainer} ${styles.large}`}>
                    <label className={styles.label}>
                        UID<span className={styles.required}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                        <MailIcon className={styles.icon} />
                        <input
                            type="text"
                            value={formData.uid}
                            onChange={(e) => handleChange("uid", e.target.value)}
                            placeholder="Введите ваш uid"
                            className={styles.input}
                        />
                    </div>
                </div>

                {/* Код */}
                <div className={`${styles.fieldContainer} ${styles.large}`}>
                    <label className={styles.label}>
                        Код подтверждения<span className={styles.required}>*</span>
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            type={visibletokens.token ? "text" : "password"}
                            value={formData.token}
                            onChange={(e) => handleChange("token", e.target.value)}
                            placeholder="Введите код"
                            className={styles.input}
                        />
                        <button
                            type="button"
                            onClick={toggletokenVisibility}
                            className={styles.tokenToggle}
                        >
                            {visibletokens.token ? (
                                <EyeIcon className={styles.icon} />
                            ) : (
                                <EyeOffIcon className={styles.icon} />
                            )}
                        </button>
                    </div>
                </div>

                {/* Кнопка */}
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    <span className={styles.buttonText}>
                        {loading ? "Проверяем..." : "Продолжить"}
                    </span>
                </button>

                {error && <p style={{ color: "red" }}>{error}</p>}
                {success && <p style={{ color: "green" }}>Успешная верификация!</p>}

                {/* Секция входа */}
                <div className={styles.loginSection}>
                    <span className={styles.loginText}>Нет аккаунта?</span>
                    <button
                        type="button"
                        className={styles.loginLink}
                        onClick={() => alert("Переход на страницу регистрации")}
                    >
                        Регистрация
                    </button>
                </div>
            </form>

            <img className={styles.backgroundImage} alt="Background" src={authimage} />
        </div>
    );
}
