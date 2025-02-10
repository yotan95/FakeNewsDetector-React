import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import './Pricing.css'
import * as PortOne from "@portone/browser-sdk/v2";
import { useState } from 'react';
import { paymentComplete } from '../api/payment.api';
import { useNavigate } from 'react-router-dom';
export function Pricing() {
    const { member } = useAuth();
    const [paymentStatus, setPaymentStatus] = useState({
        status: "IDLE",
    })
    const navigate = useNavigate();

    function randomId() {
        return [...crypto.getRandomValues(new Uint32Array(2))]
            .map((word) => word.toString(16).padStart(8, "0"))
            .join("")
    }

    const handlePrice = async (nmame, price) => {
        if (member == null) {
            toast.error("로그인을 해주세요.");
            navigate('/login');
            return;
        }

        const paymentId = randomId()
        const response = await PortOne.requestPayment({
            // Store ID 설정
            // storeId: "8zFc6BMgs6WpNHpYs4Mvm7RGdKeHKgvqeBAk7Jfun1qGjvJPgoPYSE80g8Ra2yRb6HnHeqHpvP6f2oDA",
            storeId: "store-00e73955-b6c4-4f96-a78a-88b19c846117",
            // 채널 키 설정
            channelKey: "channel-key-5224a210-4736-4d8d-9ade-65a3364d0747",
            paymentId,
            orderName: nmame,
            // totalAmount: price,
            totalAmount: 1000.,
            currency: "CURRENCY_KRW",
            payMethod: "CARD",
            customer: {
                email: member?.email,
                phoneNumber: member?.phone,
                fullName: member.name,
            },
        });
        if (response.code !== undefined) {
            toast.error(response.message);
            return
        }
        const requestPayment = {
            paymentId,
            orderName: nmame,
            totalAmount: price
        }
        console.log(response);
        // const completeResponse = paymentComplete(requestPayment);
        // completeResponse.then((res) => {
        //     if (res.data.status === 200) {
        //         toast.success(res.data.message);
        //     } else {
        //         toast.error(res.data.message);
        //     }
        // })
    }

    return (
        <div className="pricing-frame">
            <div className="pricing-div">
                <div className="pricing-text-wrapper">요금제 안내</div>
                <div className="pricing-div-2">
                    <div className="pricing-frame-wrapper">
                        <div className="pricing-div-3">
                            <div className="pricing-headline">Basic</div>
                            <div className="pricing-headline-2">무료</div>
                            <p className="pricing-p">가짜 뉴스 확인 서비스를 처음 시작하거나 체험해보고 싶은 사용자에게 적합</p>
                            <div className="pricing-buttons" onClick={() => navigate('/url')}><div className="pricing-sign-up">시작하기</div></div>
                            <div className="pricing-benefit-point">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check.svg" /></div>
                                <div className="pricing-text-wrapper-2">하루 3건의 뉴스&nbsp;&nbsp;분석 제공</div>
                            </div>
                            <div className="pricing-benefit-point">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-1.svg" /></div>
                                <p className="pricing-text-wrapper-2">간단한 분석 결과 확인 가능</p>
                            </div>
                        </div>
                    </div>
                    <div className="pricing-div-4">
                        <div className="pricing-business">
                            <div className="pricing-div-5">
                                <div className="pricing-headline">Standard</div>
                                <div className="pricing-headline-2">₩3,900 /월</div>
                                <p className="pricing-p">가짜 뉴스 확인 서비스를 활용하고 싶은 개인 사용자에게 적합</p>
                                <div className="pricing-buttons" onClick={() => handlePrice('FND Standard', 3900)}><div className="pricing-sign-up">시작하기</div></div>
                                <div className="pricing-benefit-point">
                                    <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                    <div className="pricing-text-wrapper-2">하루 50건의 뉴스&nbsp;&nbsp;분석 제공</div>
                                </div>
                                <div className="pricing-benefit-point">
                                    <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                    <p className="pricing-text-wrapper-2">상세한 분석 결과 확인 가능</p>
                                </div>
                                <div className="pricing-benefit-point-2">
                                    <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                    <p className="pricing-text-wrapper-2">이전 분석 기록 보기 사용 가능</p>
                                </div>
                            </div>
                        </div>
                        <div className="pricing-badge"><div className="pricing-text-wrapper-3">인기</div></div>
                    </div>
                    <div className="pricing-frame-wrapper">
                        <div className="pricing-div-6">
                            <div className="pricing-headline-3">Pro</div>
                            <div className="pricing-headline-2">₩7,900 /월</div>
                            <p className="pricing-p">가짜 뉴스 확인 서비스를 더 폭넓게 활용 하고 싶은 개인 사용자에게 적합</p>
                            <div className="pricing-buttons" onClick={() => handlePrice('FND Pro', 7900)}><div className="pricing-sign-up">시작하기</div></div>
                            <div className="pricing-benefit-point-2">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                <div className="pricing-text-wrapper-2">하루 150건의 뉴스&nbsp;&nbsp;분석 제공</div>
                            </div>
                            <div className="pricing-benefit-point">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                <p className="pricing-text-wrapper-2">상세한 분석 결과 확인 가능</p>
                            </div>
                            <div className="pricing-benefit-point-2">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                <p className="pricing-text-wrapper-2">이전 분석 기록 보기 사용 가능</p>
                            </div>
                            <div className="pricing-benefit-point">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                <div className="pricing-text-wrapper-2">분석결과 저장 가능</div>
                            </div>
                        </div>
                    </div>
                    <div className="pricing-enterprise">
                        <div className="pricing-div-7">
                            <div className="pricing-headline-4">Enterprise</div>
                            <div className="pricing-headline-2">₩12,900 /월</div>
                            <p className="pricing-headline-5">
                                가짜 뉴스&nbsp;&nbsp;탐지&nbsp;&nbsp;확인 서비스를 필요로 하는 기업과 단체에게 적합
                            </p>
                            <div className="pricing-sign-up-wrapper" onClick={() => handlePrice('FND Enterprise', 12900)}><div className="pricing-sign-up-2">시작하기</div></div>
                            <div className="pricing-benefit-point">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                <p className="pricing-div-8">분석 서비스 무제한 이용 가능</p>
                            </div>
                            <div className="pricing-benefit-point">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                <p className="pricing-div-8">
                                    <span className="pricing-span">분석 1건당 </span>
                                    <span className="pricing-text-wrapper-4">₩</span>
                                    <span className="pricing-span"> 1.5</span>
                                </p>
                            </div>
                            <div className="pricing-benefit-point">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                <p className="pricing-div-8">상세한 분석 결과 확인 가능</p>
                            </div>
                            <div className="pricing-benefit-point">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                <div className="pricing-div-8">분석결과 저장 가능</div>
                            </div>
                            <div className="pricing-benefit-point">
                                <div className="pricing-check-wrapper"><img className="pricing-check" src="https://c.animaapp.com/yPYaJCg8/img/check-2.svg" /></div>
                                <div className="pricing-div-8">다양한 솔루션&nbsp;&nbsp;지원 제공</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
} 