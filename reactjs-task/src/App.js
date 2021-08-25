import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Container, FormGroup, Input, Label, Row, Button } from 'reactstrap';
import Header from './components/Header';
import { addDataDaerah } from './slice/DesaSlice';
import { DESA_URL, KECAMATAN_URL, KOTA_URL, PROVINSI_URL } from './url';

function App() {
  const dataDaerahRedux = useSelector((state) => state.dataDaerahSave.data);
  const dispatch = useDispatch();
  const [kota, setKota] = useState([]);
  const [provinsi, setProvinsi] = useState([]);
  const [kecamatan, setKecamatan] = useState([]);
  const [desa, setDesa] = useState([]);
console.log(dataDaerahRedux);
  const [storeData, setStoreData] = useState({ provinsi: '', kota: '', kecamatan: '', desa: '' });

  const getDataProvinsi = async () => {
    try {
      const dataProvinsi = await ( await fetch(PROVINSI_URL)).json();
      setProvinsi(dataProvinsi);
    } catch (error) {
      console.log(error);
    }
  }

  const getDataKota = async (provinsiID) => {
    try {
      const dataKota = await ( await fetch(`${KOTA_URL}${provinsiID}`)).json();
      setKota(dataKota);
    } catch (error) {
      console.log(error);
    }
  }

  const getDataKecamatan = async (kecamatanID) => {
    try {
      const dataKecamatan = await ( await fetch(`${KECAMATAN_URL}${kecamatanID}`)).json();
      setKecamatan(dataKecamatan);
    } catch (error) {
      console.log(error);
    }
  }

  const getDataDesa = async (desaID) => {
    try {
      const dataDesa = await ( await fetch(`${DESA_URL}${desaID}`)).json();
      setDesa(dataDesa);
    } catch (error) {
      console.log(error);
    }
  }

  const onChangeProvinsi = (e) => {
    setStoreData({
      ...storeData,
      [e.target.name]: e.target.value
    });
    getDataKota(e.target.value);
  }

  const onChangeKota = (e) => {
    const kotaID = e.target.value;
    const { name } = kota.find((k) => k.id === +kotaID);
    setStoreData({
      ...storeData,
      kota: name
    })
    getDataKecamatan(kotaID);
  }

  const onChangeKecamatan = (e) => {
    const kecamatanID = e.target.value;
    const { name } = kecamatan.find((k) => k.id === +kecamatanID);
    setStoreData({
      ...storeData,
      kecamatan: name
    })
    getDataDesa(kecamatanID);
  }

  const onChangeDesa = (e) => {
    const desaID = e.target.value;
    const { name } = desa.find((d) => d.id === +desaID);
    setStoreData({
      ...storeData,
      desa: name
    })

    console.log(storeData);
  }

  const onClickSimpan = () => {
    if (!storeData.desa) {
      alert('harus diisi semua')
      return;
    }
    dispatch(addDataDaerah(storeData));
  }

  useEffect(() => {
    getDataProvinsi();
  }, []);

  return (
    <div>
      <Header />
      <Container>
        <Row>
          <Col>
            <FormGroup className="my-2">
              <Label>Provinsi</Label>
              <Input type="select" name="provinsi" onChange={ onChangeProvinsi }>
              { provinsi.length === 0 && <option value="">Loading</option> }
                { provinsi?.map((prov) => (
                  <option key={ prov.id } value={ prov.id }>{ prov.name }</option>
                )) }
              </Input>
            </FormGroup>
            <FormGroup className="my-2">
              <Label>Kota</Label>
              <Input type="select" name="kota" onChange={ onChangeKota }>
                { kota.length === 0 && <option value="">Pilih Provinsi Dahulu</option> }
                { kota?.map((kota) => (
                  <option key={ kota.id } value={ kota.id }>{ kota.name }</option>
                )) }
              </Input>
            </FormGroup>
            <FormGroup className="my-2">
              <Label>Kecamatan</Label>
              <Input type="select" name="kota" onChange={ onChangeKecamatan }>
                { kecamatan.length === 0 && <option value="">Pilih Kota Dahulu</option> }
                { kecamatan?.map((kec) => (
                  <option key={ kec.id } value={ kec.id }>{ kec.name }</option>
                )) }
              </Input>
            </FormGroup>
            <FormGroup className="my-2">
              <Label>Desa</Label>
              <Input type="select" name="kota" onChange={ onChangeDesa }>
                { desa.length === 0 && <option value="">Pilih Kecamatan Dahulu</option> }
                { desa?.map((desa) => (
                  <option key={ desa.id } value={ desa.id }>{ desa.name }</option>
                )) }
              </Input>
            </FormGroup>
            <FormGroup className="my-1">
              <Button onClick={ onClickSimpan }>Simpan</Button>
            </FormGroup>
            <div>
              <h1>Data Daerah</h1>
              {dataDaerahRedux?.map((daerah) => (
                <ul>
                  <li>ID Provinsi: { daerah.provinsi }</li>
                  <li>Kota / Kabupaten: { daerah.kota }</li>
                  <li>Kecamatan: { daerah.kecamatan }</li>
                  <li>Desa: { daerah.desa }</li>
                </ul>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
