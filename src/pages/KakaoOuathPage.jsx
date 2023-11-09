import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import Loader from '@components/atoms/Loader';
import routes from '@/constant/routes';
import { loginSuccessMessage } from '@/utils/alert';
import getLoginInfo from '@/apis/login';

// 리다이렉팅 처리 화면
const KakaoOuathPage = () => {
  const navigate = useNavigate();
  const { data } = useQuery(['getLoginInfo'], getLoginInfo);
  // 로그인 완료시 로그인 성공 메시지를 띄우고 유저 정보를 받아옴(토큰 등)
  // 그리고 로그인 완료 처리를 하고, 액세스 토큰을 계속 담아 보냄
  // 로그인 완료되면 홈 페이지로 이동시킴

  // 회원가입 유무에 따라 2가지로 분기됨
  // 회원가입 O - 토큰을 저장하고 바로 로그인 처리하고 홈페이지 이동
  // 회원가입 X - 토큰을 저장하고 계좌정보 입력 페이지 이동 - 계좌정보를 입력하고 나면 바로 로그인 처리하고 홈페이지 이동
  useEffect(() => {
    if (data) {
      const status = data.data.success;
      if (status) {
        const userInfo = data.data.response;
        const { userAuth, AccessToken } = userInfo;
        localStorage.setItem('accessToken', AccessToken);
        localStorage.setItem('userAuth', userAuth);
        if (localStorage.getItem('userAuth') === 'GUEST') {
          navigate(routes.registerBank);
        } else {
          Swal.fire(loginSuccessMessage).then(routes.home);
        }
      }
    }
  }, [data]);

  return (
    <div className="page--layout">
      <div className="text-blue text-xl ml-[30px] mt-[200px]">
        로그인 중이에요! <br />
        잠시만 기다려주세요😊
      </div>
      <Loader />
    </div>
  );
};

export default KakaoOuathPage;
