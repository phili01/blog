import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Create.css';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';
import AddImage from './AddImage/AddImage';

class Create extends  Component {
    state = {
        showCateg: false,
        categs: [],
        noCateg: false,
        addCateg: null,
        disable: true,
        addNewCateg: true,
        addCategInput: '',
        categActiveProps: {
            active: false,
            index: null
        },
        showAddItm: false,
        showAddItmOpt: true,
        formElement: {
            title: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            },
            content: {
                value: '',
                validation: {
                    required: true,
                    minLength: 1
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    componentDidUpdate() {
        if (this.state.showCateg && !this.props.showCateg) {
            this.setState({showCateg: false})
        }

        if (this.state.addNewCateg && this.props.newCateg) {
            let categs = [...this.state.categs]
            this.setState({categs: this.props.newCateg,addNewCateg: false, noCateg: !categs.length > 1})
        }
        if (this.props.uploadPercent === 100 && this.props.id) {
            if (this.props.media.image) {
                for (let image of this.props.media.image) {
                    window.URL.revokeObjectURL(image.url);
                }
            }

            if (this.props.media.video) {
                for (let video of this.props.media.video) {
                    window.URL.revokeObjectURL(video.url);
                }
            }
            window.location.assign('/');
        } 
    }

    showCategHandler = () => {
        if (!this.state.showCateg) {
            this.props.onFetchCateg();
            this.setState({
                showCateg: true
            });
            return
        }
        this.setState({
            showCateg: false});
    }

    selectCategHandler = (categ) => {
        this.setState({categs: [categ],  noCateg: false});
    }

    addCategHandler = (event) => {
        let value =  event.target.value;
        this.setState({addCateg: value, addCategInput: value, disable: value.length < 1})
    }

    addNewCategHandler = () => {
        this.props.onAddCateg(this.state.addCateg);
        this.setState({addNewCateg: true, addCategInput: '', disable: true })
    }

    categActiveHandler = (index) => {
        this.setState({categActiveProps: {active: true, index}})
    }

    categDefaultHandler = () => {
        this.setState({categActiveProps: {active: false, index: null}})
    }

    removeCategSelectHandler = (index) => {
        let category = [...this.state.categs]
            .filter((categ, categIndex) => categIndex !== index);
            this.setState({categs: category})
    }

    addItemHandler = () => {
        this.setState((prevState, props) => {
            return {
                showAddItm: !prevState.showAddItm
            };
        });
    }

    inputChangedHandler = (editorState, inputType) => {
        let updateFormType = updateObject(this.state.formElement[inputType], {
            value: editorState.target.value,
            valid: checkValidity(editorState.target.value, this.state.formElement[inputType].validation),
            touched: true
        });
        
        let formIsValid = true;
        let updateFormElement = updateObject(this.state.formElement, {[inputType]: updateFormType})

        for (let inputType in updateFormElement) {
            formIsValid = updateFormElement[inputType].valid && formIsValid;
        }

        this.setState({formElement: updateFormElement, formIsValid})
    }

    submitHandler = () => {
       if (this.state.formIsValid && this.state.categs.length > 0) {
            let newCnt = {
                categ: this.state.categs,
                desc: this.state.formElement.content.value,
                title: this.state.formElement.title.value,
                image: this.props.media.image ? this.props.media.image: []
            }
            this.props.onSubmitForm(newCnt)
        return
       }
       this.setState({noCateg: true});
    }

    closeModalHandler = () => {
        window.location.reload();
    }

    render() {
        let addCateg = null;
        let categListClass = ['site-form__cnt--det__selec site-form__cnt--det__selec--categ'];
        let categItems = null;
        let addItemClass = ['site-form__cnt--det__selec site-form__cnt--det__selec--add'];
        let addItemOptClass = ['site-form__cnt--det__selec--opt'];

        if (this.state.showAddItm) {
            addItemClass.push('site-form__cnt--det__selec--add__visible icon--rotate');
            addItemOptClass.push('site-form__cnt--det__selec--opt__visible')
        }

        if (this.state.showCateg && !this.props.categ) {
            categListClass.push('icon--rotate');
            addCateg =  (
                <ul className="site-form__cnt--det__selec--opt site-form__cnt--det__selec--opt__visible">
                    <li className="site-form__cnt--det__selec--opt__loading">
                        Loading ...
                    </li>
                </ul>
            );
        }
        
        if (this.state.showCateg && this.props.categ) {
            categListClass.push('icon--rotate');
            addCateg =  (
                <ul className="site-form__cnt--det__selec--opt site-form__cnt--det__selec--opt__visible">
                    {this.props.categ.map((categItem, index) => (
                        <li key={index} onClick={this.selectCategHandler.bind(this, categItem)}>{categItem}</li>
                    ) )}
                </ul>
            );
        }
        
        if (this.state.categs.length > 0) {
            categItems = (
                <div className="site-form__cnt--tag">
                    {this.state.categs.join('')}
                </div>
            )
        }

        return (
            <form className="site-form">
                <div className="site-form__wrapper">
                {this.props.uploadPercent ? <div style={{width: `${this.props.uploadPercent}%`, height: 2, backgroundColor: 'green', position: "absolute", top: "0"}}></div> : null }
                    <div className="site-form__cnt">
                    <div className="site-form__cnt--wrapper">
                            <label className="site-form__cnt--title">
                                Category (*)
                            </label>
                            <div className="site-form__cnt--det">
                                <div className="site-form__cnt--det__wrapper">
                                    <div 
                                        className={categListClass.join(' ')}
                                        onClick={this.showCategHandler}>
                                        Category 
                                        <FontAwesomeIcon 
                                            icon={['fas', 'angle-down']} 
                                            className="icon icon__site-form--angle" />
                                       { addCateg }
                                    </div>
                                    <div className="site-form__cnt--det__alt">
                                        <div className="site-form__cnt--det__alt--title">
                                            <div>or</div>
                                        </div>
                                        <div className="site-form__cnt--det__alt--cnt">
                                            <input 
                                                type="text" name="" id="" 
                                                className="site-form__cnt--det__input" 
                                                placeholder="Write new category ..." 
                                                value={this.state.addCategInput}
                                                onChange={this.addCategHandler}/>
                                            <button
                                                type="button"
                                                onClick={this.addNewCategHandler}
                                                disabled={this.state.disable}>
                                                ADD
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { categItems }
                            { this.state.noCateg ?
                                <div className="site-form__err">Select or Add New Category</div>
                                : null
                            }
                        </div>
                        <div className="site-form__cnt--wrapper">
                            <label className="site-form__cnt--title">Post Title (*)</label>
                            <div className="site-form__cnt--det">
                                <input 
                                    type="text" 
                                    name=""
                                    required
                                    minLength="1"
                                    value={this.state.formElement.title.value}
                                    className="site-form__cnt--det__input site-form__cnt--det__input--lg"
                                    onChange={(event) => this.inputChangedHandler(event, 'title')} />
                            </div>
                            { !this.state.formElement.title.valid && this.state.formElement.title.touched ?
                                <div className="site-form__err">Post title must not be empty </div>
                                : null
                            }
                        </div>
                        <div className="site-form__cnt--wrapper">
                            <label className="site-form__cnt--title">Description (*)</label>
                            <div className="site-form__cnt--det">
                                <textarea value={this.state.formElement.content.value} 
                                className="site-form__cnt--det__info"
                                onChange={(event) => this.inputChangedHandler(event, 'content')}></textarea>
                            </div>
                            { !this.state.formElement.content.valid && this.state.formElement.content.touched ?
                                <div className="site-form__err">Description must not be empty</div>
                                : null
                            }
                        </div>
                    </div>
                    <AddImage />
                    {this.props.submitError ? <div className="site-form__err">Network Error</div> : null}
                    <div className="site-form__footer site-form__btn">
                        <button 
                            type="button" 
                            className="site-form__btn--add"
                            disabled={this.props.uploadPercent || !this.state.formIsValid || this.state.categs.length < 1 || !this.props.media.image}
                            onClick={this.submitHandler}>
                            {this.props.uploadPercent ? `${this.props.uploadPercent}%`  : "ADD"}
                        </button>
                    </div>
                </div>
            </form>
        );
    }
};

const mapStateToProps = state => {
    return {
        categ: state.form.categ,
        categErr: state.form.categErr,
        showCateg: state.form.showCateg,
        newCateg: state.form.newCateg,
        snapshot: state.form.snapshot,
        media: state.form.media,
        uploadPercent: state.form.uploadPercent,
        submitForm: state.form.submitForm,
        submitError: state.form.submitError,
        id: state.form.id
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchCateg: () => dispatch(actions.fetchCategInit()),
        onAddCateg: (categ) => dispatch(actions.addCategInit(categ)),
        onSubmitForm: (formData) => dispatch(actions.submit(formData))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Create);