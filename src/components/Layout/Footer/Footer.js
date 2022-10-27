import classNames from "classnames/bind";

import styles from './Footer.module.scss'
import Social_cion1 from '~/assets/img/snsicon-01.png'
import Social_cion2 from '~/assets/img/snsicon-02.png'
import Social_cion3 from '~/assets/img/snsicon-03.png'

const cx = classNames.bind(styles);

function Footer() {
    return (<div className={cx('wrapper')}>
        <div className={cx('inner')}>

            <div className={cx('detail')}>
                <div className={cx('left')}>
                    <p className={cx('left-title')}>what happened</p>
                    <p className={cx('left-content')}>[공지] 개인 정보 처리 방침 변경 사전 안내
                        [공지] 29CM 강남 스토어 영업 종료
                        [공지] 개인 정보 처리 방침 변경 사전 안내
                        [공지] iOS 10 이하 버전 지원 중단 안내
                        [공지] 개인 정보 처리 방침 변경 사전 안내</p>
                </div>
                <div className={cx('right')}>
                    <div className={cx('right-1')}>
                        <p className={cx('right-1-title')}>about us</p>
                        <p className={cx('right-1-content')}>회사 소개
                            인재 채용
                            상시 할인 혜택</p>
                    </div>

                    <div className={cx('right-2')}>
                        <p className={cx('right-2-title')}>my order</p>
                        <p className={cx('right-2-content')}>
                            회사 소개
                            인재 채용
                            상시 할인 혜택
                        </p>
                    </div>
                    <div className={cx('right-3')}>
                        <p className={cx('right-3-title')}>my account</p>
                        <p className={cx('right-3-content')}>회원 정보 수정
                            회원 등급
                            마일리지 현황
                            쿠폰</p>
                    </div>
                    <div className={cx('right-4')}>
                        <p className={cx('right-4-title')}>help</p>
                        <p className={cx('right-4-content')}>1 : 1 상담 내역
                            상품 Q & A 내역
                            공지 사항
                            자주하는 질문
                            고객의 소리</p>
                    </div>
                </div>
            </div>
            <div className={cx('contact')}>
                <p>© 2020-2021 what happened corp  l  (주) 왓헤픈 ｜ 대표자 : 홍길동 ｜ 사업자 등록번호 : 356-00-00000 ㅣ test0101@what happened.co.kr
                    서울특별시 강남구 도산대로 8길 17 ｜ FAX : 070-0000-0000  l  서비스 이용약관  l  개인정보처리방침
                </p>
                <div className={cx('social')}>
                    <img
                        src={Social_cion1}
                        alt="" />
                    <img
                        src={Social_cion2}
                        alt="" />
                    <img
                        src={Social_cion3}
                        alt="" />
                </div >
            </div>
        </div>

    </div>);
}

export default Footer;