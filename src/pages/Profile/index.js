import React, {useRef, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {updateProfileRequest} from '../../store/modules/user/actions';
import {signOut} from '../../store/modules/auth/actions';
import Background from '../../components/Background';
import {
    Container,
    Title,
    Form,
    FormInput,
    SubmitButton,
    LogoutButton,
    Separator,
} from './styles';

function Profile() {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.user.profile);

    const emailRef = useRef();
    const oldPasswordRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [oldPassword, setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        setOldPassword('');
        setPassword('');
        setConfirmPassword('');
    }, [profile]);

    function handleSubmit() {
        dispatch(
            updateProfileRequest({
                name,
                email,
                oldPassword,
                password,
                confirmPassword,
            })
        );
    }

    function handleLogout() {
        dispatch(signOut());
    }

    return (
        <Background>
            <Container>
                <Title>Meu perfil</Title>
                <Form>
                    <FormInput
                        icon="person -outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome completo"
                        value={name}
                        onChangeText={setName}
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                    />

                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChangeText={setEmail}
                        ref={emailRef}
                        returnKeyType="next"
                        onSubmitEditing={() => oldPasswordRef.current.focus()}
                    />

                    <Separator />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua senha atual"
                        value={oldPassword}
                        onChangeText={setOldPassword}
                        ref={oldPasswordRef}
                        returnKeyType="send"
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua nova senha"
                        value={password}
                        onChangeText={setPassword}
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={() =>
                            confirmPasswordRef.current.focus()
                        }
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirmação de senha"
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        ref={confirmPasswordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton onPress={handleSubmit}>
                        Atualizar perfil
                    </SubmitButton>

                    <LogoutButton onPress={handleLogout}>
                        Sair do GoBarber
                    </LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}

Profile.navigationOptions = {
    tabBarLabel: 'Meu perfil',
    tabBarIcon: ({tintColor}) => (
        <Icon name="person" size={20} color={tintColor} />
    ),
};

export default Profile;
