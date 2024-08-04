import React, { useState, useEffect } from 'react';

const Sakura = ({ x, y, s, r, fn }) => {
  const [x, setX] = useState(x);
  const [y, setY] = useState(y);
  const [s, setS] = useState(s);
  const [r, setR] = useState(r);
  
  useEffect(() => {
    const animate = () => {
      if (x > window.innerWidth || x < 0 || y > window.innerHeight || y < 0) {
        setR(getRandom('fnr'));
        if (Math.random() > 0.4) {
          setX(getRandom('x'));
          setY(0);
          setS(getRandom('s'));
          setR(getRandom('r'));
        } else {
          setX(window.innerWidth);
          setY(getRandom('y'));
          setS(getRandom('s'));
          setR(getRandom('r'));
        }
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, [x, y, s, r]);

  return (
    <>
      <canvas
        width={40 * s}
        height={40 * s}
        style={{ position: 'absolute', left: `${x}px`, top: `${y}px`, pointerEvents: 'none' }}
      ></canvas>
    </>
  );
};

const SakuraList = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const animate = () => {
      const canvas = document.createElement('canvas');
      const cxt = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'fixed';
      canvas.style.left = '0';
      canvas.style.top = '0';
      canvas.style.pointerEvents = 'none';
      document.body.appendChild(canvas);

      for (let i = 0; i < 50; i++) {
        const sakura = new Sakura(
          getRandom('x'),
          getRandom('y'),
          getRandom('s'),
          getRandom('r'),
          {
            x: getRandom('fnx'),
            y: getRandom('fny'),
            r: getRandom('fnr'),
          }
        );
        sakura.draw(cxt);
        setList((prevList) => [...prevList, sakura]);
      }

      const update = () => {
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        list.forEach((sakura) => sakura.update());
        list.forEach((sakura) => sakura.draw(cxt));
        requestAnimationFrame(update);
      };
      update();

      return () => {
        document.body.removeChild(canvas);
        window.cancelAnimationFrame(update);
      };
    };
    animate();
  }, []);

  return list;
};

const getRandom = (option) => {
  let ret, random;
  switch(option) {
    case 'x':
      ret = Math.random() * window.innerWidth;
      break;
    case 'y':
      ret = Math.random() * window.innerHeight;
      break;
    case 's':
      ret = Math.random();
      break;
    case 'r':
      ret = Math.random() * 6;
      break;
    case 'fnx':
      random = -0.5 + Math.random() * 1;
      ret = (x, y) => x + 0.5 * random - 1.7;
      break;
    case 'fny':
      random = 1.5 + Math.random() * 0.7;
      ret = (x, y) => y + random