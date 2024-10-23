import React, { FC } from 'react';
import moleImg from '../../assets/WAM_Mole.png';
import holeImg from '../../assets/WAM_Hole.png';
import { useDispatch, useSelector } from 'react-redux';
import { increaseScore } from '../../redux/reducers/gameSlice';
import { AppDispatch, RootState } from '../../redux/store';
import './mole.scss';

export type MoleProps = {
  id: number;
  isActive: boolean;
};

const Mole: FC<MoleProps> = ({ id, isActive }) => {
  const dispatch: AppDispatch = useDispatch();
  const start = useSelector((state: RootState) => state.game.start);
  const end = useSelector((state: RootState) => state.game.end);

  const handleClick = () => {
    if (!start || end) return;
    if (isActive) {
      // Dispatch the action with the mole's id
      dispatch(increaseScore(1));
    }
  };

  return (
    <div className="mole" onClick={handleClick} data-testid={`mole-${id}`}>
      {isActive ? (
        <img src={moleImg} alt="mole" className="mole-img" />
      ) : (
        <img src={holeImg} alt="hole" className="mole-img" />
      )}
    </div>
  );
};

export default Mole;
