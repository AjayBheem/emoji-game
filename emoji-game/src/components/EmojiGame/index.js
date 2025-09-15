import {Component} from 'react'
import './index.css'

class EmojiGame extends Component {
  state = {
    clickedEmojis: [],
    score: 0,
    topScore: 0,
    isGameOver: false,
    isWon: false,
  }

  onClickEmoji = id => {
    const {clickedEmojis, score, topScore} = this.state
    const {emojisList} = this.props
    const alreadyClicked = clickedEmojis.includes(id)

    if (alreadyClicked) {
      this.setState({
        isGameOver: true,
        isWon: false,
        topScore: score > topScore ? score : topScore,
      })
    } else {
      const updatedEmojis = [...clickedEmojis, id]
      const updatedScore = score + 1
      const hasWon = updatedEmojis.length === emojisList.length

      this.setState({
        clickedEmojis: updatedEmojis,
        score: updatedScore,
        isGameOver: hasWon,
        isWon: hasWon,
        topScore: updatedScore > topScore ? updatedScore : topScore,
      })
    }
  }

  onClickPlayAgain = () => {
    this.setState({
      clickedEmojis: [],
      score: 0,
      isGameOver: false,
      isWon: false,
    })
  }

  renderNavBar = () => {
    const {score, topScore, isGameOver} = this.state
    return (
      <nav className="navbar">
        <div className="logo-title">
          <img
            src="https://assets.ccbp.in/frontend/react-js/game-logo-img.png"
            alt="emoji logo"
            className="logo-img"
          />
          <h1>Emoji Game</h1>
        </div>
        {!isGameOver && (
          <div className="scores">
            <p>Score: {score}</p>
            <p>Top Score: {topScore}</p>
          </div>
        )}
      </nav>
    )
  }

  renderEmojis = () => {
    const {emojisList} = this.props
    const shuffledEmojis = [...emojisList].sort(() => Math.random() - 0.5)

    return (
      <ul className="emoji-grid">
        {shuffledEmojis.map(each => (
          <li key={each.id}>
            <button
              type="button"
              className="emoji-btn"
              onClick={() => this.onClickEmoji(each.id)}
            >
              <img src={each.emojiUrl} alt={each.emojiName} className="emoji-img" />
            </button>
          </li>
        ))}
      </ul>
    )
  }

  renderWinLoseCard = () => {
    const {isWon, score} = this.state
    const {emojisList} = this.props
    const imageUrl = isWon
      ? 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'
    const message = isWon ? 'You Won' : 'You Lose'
    return (
      <div className="win-lose-card">
        <h1>{message}</h1>
        <p>Score: {score}/{emojisList.length}</p>
        <img src={imageUrl} alt="win or lose" className="win-lose-img" />
        <button type="button" className="play-btn" onClick={this.onClickPlayAgain}>
          Play Again
        </button>
      </div>
    )
  }

  render() {
    const {isGameOver} = this.state
    return (
      <div className="emoji-game-container">
        {this.renderNavBar()}
        {isGameOver ? this.renderWinLoseCard() : this.renderEmojis()}
      </div>
    )
  }
}

export default EmojiGame
