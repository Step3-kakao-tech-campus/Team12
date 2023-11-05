/*eslint-disable*/
import Labels from '../../molecules/Labels';
import Input from '../../atoms/input/Input';
import TextArea from '../../atoms/TextArea';
import RangeInput from '../../atoms/input/RangeInput';
import ErrorMsg from '../../atoms/ErrorMsg';
import price from '../../../constant/price';
import { DESTINATION, TIP, REQUEST, ORDER_REQUEST } from '../../../constant/postWrite/orderRequest';
import validateInputMsg from '../../../constant/validateInputMsg';
import { useFormContext } from 'react-hook-form';

const OrderRequestTemplate = () => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  return (
    <>
      <div className="mt-6 mb-12">
        <Labels htmlFor={DESTINATION} label="어디로 픽업할까요? *" subLabel="피커가 해당 장소로 픽업해 줄 거예요." />
        <Input
          id={DESTINATION}
          name={DESTINATION}
          register={register(DESTINATION, { required: validateInputMsg.DESTINATION_MSG })}
          placeholder="공과대학 7호관 1층"
        />
        <ErrorMsg errors={errors} name={DESTINATION} as="p" />
      </div>
      <div className="mt-6 mb-12">
        <Labels
          htmlFor={TIP}
          label="지불할 픽업팁을 선택 해주세요. *"
          subLabel="매칭이 성사되면, 피커에게 입금 해야합니다."
        />
        <div className="flex justify-between my-2 mx-[0.4rem]">
          <div>😭</div>
          <div>😍</div>
        </div>
        <div className="flex justify-center items-center">
          <RangeInput id={TIP} name={TIP} register={register(TIP)} />
        </div>
        <div className="mt-3 flex justify-between text-xs text-gray-400">
          {price.map((x) => {
            return <div>{x}</div>;
          })}
        </div>
      </div>
      <div className="mt-6">
        <Labels htmlFor={REQUEST} label="피커에게 요청사항이 있나요?" subLabel="50자까지 입력 가능합니다." />
        <TextArea
          id={REQUEST}
          name={REQUEST}
          register={register(REQUEST)}
          maxLength="50"
          placeholder="1층 도착하면 알려주세요!"
        />
      </div>
    </>
  );
};

export default OrderRequestTemplate;
